import db from '../models/index.js';
import { createOrder, createTickets} from '../utils/checkoutHelpers.js';

// Tạo đơn hàng mới
export const createOrderService = ({ user_id, showtime_id, seats, total_amount }) => new Promise(async (resolve, reject) =>{
    try {
        const showtime = await db.Showtime.findByPk(showtime_id);
        if (!showtime) {
            return resolve({
                err: 1,
                msg: 'Showtime không tồn tại!',
                order_id: null,
            });
        }

        const order = await createOrder({ user_id, total_amount });
        const tickets = await createTickets({ order_id: order.order_id, showtime_id, basePrice: showtime.price, seats });
        resolve({
            err: tickets.length > 0 ? 0 : 1,
            msg: tickets.length > 0 ? 'Đặt vé thành công!' : 'Đặt vé thất bại!',
            order_id: order.order_id,
            tickets: tickets.map(ticket => ({
                ticket_id: ticket.ticket_id,
                seat_id: ticket.seat_id,
                price: ticket.price,
                showtime_id: ticket.showtime_id,
            }))
        });
    } catch (error) {
        reject(error);
    }
});

export const getOrderHistoryService = (user_id) => new Promise(async (resolve, reject) => {
    try {
        const orders = await db.OrderTable.findAll({
            where: { user_id },
            attributes: ['order_id', 'order_date', 'total_amount'],
            include: [
                {
                    model: db.Ticket,
                    as: 'tickets',
                    attributes: [
                        'ticket_id', 'seat_id',
                        'movie_title_snapshot', 'cinema_name_snapshot',
                        'cluster_name_snapshot', 'chain_name_snapshot',
                        'address_snapshot', 'row_snapshot', 'column_snapshot',
                        'showtime_date_snapshot', 'showtime_starttime_snapshot',
                        'showtime_endtime_snapshot', 'price_snapshot'
                    ],
                    include: [
                        {
                            model: db.Seat,
                            as: 'seat',
                            attributes: ['row', 'column'], 
                        },
                        {
                            model: db.Showtime,
                            as: 'showtime',
                            attributes: ['showtime_id', 'showtime_date', 'showtime_starttime', 'showtime_endtime','price'],
                            include: [
                                {
                                    model: db.Movie,
                                    as: 'movie',
                                    attributes: ['title']
                                },
                                {
                                    model: db.Cinema,
                                    as: 'cinema',
                                    attributes: ['cinema_name'],
                                    include: [
                                        {
                                            model: db.CinemaCluster,
                                            as:'cinema_cluster',
                                            attributes: ['cluster_name','address'],
                                            include: [
                                                {
                                                    model: db.CinemaChain,
                                                    as: 'cinema_chain',
                                                    attributes: ['chain_name']
                                                }
                                            ],
                                        }
                                    ],
                                }
                            ],
                        }
                    ],
                }
            ]
        })

        const response = orders.map(order => {
            const firstTicket = order.tickets.length ? order.tickets[0] : null;
            const showtime = firstTicket?.showtime;

            return {
                order_id: order.order_id,
                order_date: order.order_date,
                total_amount: order.total_amount,
                movie_title: showtime?.movie?.title || firstTicket?.movie_title_snapshot,
                cinema_name: showtime?.cinema?.cinema_name || firstTicket?.cinema_name_snapshot,
                cluster_name: showtime?.cinema?.cinema_cluster?.cluster_name || firstTicket?.cluster_name_snapshot,
                chain_name: showtime?.cinema?.cinema_cluster?.cinema_chain?.chain_name || firstTicket?.chain_name_snapshot,
                address: showtime?.cinema?.cinema_cluster?.address || firstTicket?.address_snapshot,
                showtime_date: showtime?.showtime_date || firstTicket?.showtime_date_snapshot,
                showtime_starttime: showtime?.showtime_starttime || firstTicket?.showtime_starttime_snapshot,
                showtime_endtime: showtime?.showtime_endtime || firstTicket?.showtime_endtime_snapshot,
                seats: order.tickets.map(ticket => ({
                    id: ticket.seat_id,
                    row: ticket.seat?.row ?? ticket.row_snapshot,
                    column: ticket.seat?.column ?? ticket.column_snapshot,
                    price: ticket.price_snapshot
                }))
            };
        });

        resolve({
            err: 0,
            msg: 'Lấy lịch sử đặt vé thành công!',
            response
        });
    } catch (error) {
        reject(error);
    }
});