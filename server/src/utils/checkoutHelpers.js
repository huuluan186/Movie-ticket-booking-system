import db from '../models';
import {v4} from 'uuid'

// Tạo đơn hàng
export const createOrder = async ({ user_id, total_amount }) => {
    const order = await db.OrderTable.create({
        order_id: v4(),
        user_id,
        order_date: new Date(),
        total_amount,
        payment_status: 'Completed'
    });
    return order;
};

const roundToNearestThousand = (value) => Math.round(value / 1000) * 1000;

// Tạo các vé
export const createTickets = async ({ order_id, showtime_id, basePrice, seats }) => {
    const seatIds = seats.map(seat => seat.seatId);

    // Kiểm tra ghế đã được đặt chưa
    const existingTickets = await db.Ticket.findAll({
        where: {
            seat_id: seatIds,
            showtime_id
        }
    });

    if (existingTickets.length > 0) {
        const bookedSeats = existingTickets.map(ticket => ticket.seat_id);
        throw new Error(`Ghế ${bookedSeats.join(', ')} đã có người đặt`);
    }

     // Lấy thông tin ghế để biết row, column, type
    const seatsInfo = await db.Seat.findAll({
        where: {
            seat_id: seatIds
        },
        attributes: ['seat_id', 'type', 'row', 'column']
    });

    const seatMap = {};
    seatsInfo.forEach(seat => {
        seatMap[seat.seat_id] = seat.dataValues;
    });

     // Lấy thông tin showtime kèm liên kết (movie + cinema)
    const showtime = await db.Showtime.findByPk(showtime_id, {
        include: [
            { model: db.Movie, as: 'movie', attributes: ['title'] },
            {
                model: db.Cinema,
                as: 'cinema',
                attributes: ['cinema_name'],
                include: [{
                    model: db.CinemaCluster,
                    as: 'cinema_cluster',
                    attributes: ['cluster_name', 'address'],
                    include: [{
                        model: db.CinemaChain,
                        as: 'cinema_chain',
                        attributes: ['chain_name']
                    }]
                }]
            }
        ]
    });

    const tickets = await Promise.all(
        seats.map(seat => {
            const seatInfo = seatMap[seat.seatId] ;
            const seatType = seatInfo?.type || 'Normal';
            let finalPrice = basePrice;
            if (seatType === 'VIP') finalPrice = roundToNearestThousand(basePrice * process.env.VIP_PRICE_INCREMENT);

            return db.Ticket.create({
                ticket_id: v4(),
                order_id,
                showtime_id,
                seat_id: seat.seatId,
                price: finalPrice,

                // Snapshot datas
                movie_title_snapshot: showtime?.movie?.title || null,
                cinema_name_snapshot: showtime?.cinema?.cinema_name || null,
                cluster_name_snapshot: showtime?.cinema?.cinema_cluster?.cluster_name || null,
                chain_name_snapshot: showtime?.cinema?.cinema_cluster?.cinema_chain?.chain_name || null,
                address_snapshot: showtime?.cinema?.cinema_cluster?.address || null,

                row_snapshot: seatInfo?.row || null,
                column_snapshot: seatInfo?.column || null,
                showtime_date_snapshot: showtime?.showtime_date || null,
                showtime_starttime_snapshot: showtime?.showtime_starttime || null,
                showtime_endtime_snapshot: showtime?.showtime_endtime || null,
                price_snapshot: finalPrice
            })
        })
    );
    return tickets;
};