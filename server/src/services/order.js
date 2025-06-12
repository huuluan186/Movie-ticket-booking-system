import db from '../models';
import { createOrder, createTickets} from '../utils/checkoutHelpers';

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
        const tickets = await createTickets({ order_id: order.order_id, showtime_id,price: showtime.price, seats });
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
                    attributes: ['ticket_id', 'seat_id'],
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
            const firstTicket = order.tickets[0];
            const showtime = firstTicket?.showtime;

            return {
                order_id: order.order_id,
                order_date: order.order_date,
                total_amount: order.total_amount,
                movie_title: showtime?.movie?.title,
                cinema_name: showtime?.cinema?.cinema_name || "",
                cluster_name: showtime?.cinema?.cinema_cluster?.cluster_name,
                chain_name: showtime?.cinema?.cinema_cluster?.cinema_chain?.chain_name,
                address: showtime?.cinema?.cinema_cluster?.address,
                showtime_date: showtime?.showtime_date,
                showtime_starttime: showtime?.showtime_starttime,
                showtime_endtime: showtime?.showtime_endtime,
                seats: order.tickets.map(ticket => ({
                    id: ticket.seat_id,
                    row: ticket.seat?.row, 
                    column: ticket.seat?.column, 
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