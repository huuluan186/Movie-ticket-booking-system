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

     // Lấy thông tin ghế để biết loại
    const seatsInfo = await db.Seat.findAll({
        where: {
            seat_id: seatIds
        },
        attributes: ['seat_id', 'type']
    });

    const seatTypeMap = {};
    seatsInfo.forEach(seat => {
        seatTypeMap[seat.seat_id] = seat.type;
    });

    const tickets = await Promise.all(
        seats.map(seat => {
            const seatType = seatTypeMap[seat.seatId] || 'Normal';
            let finalPrice = basePrice;

            if (seatType === 'VIP') finalPrice = roundToNearestThousand(basePrice * 1.118);

            return db.Ticket.create({
                ticket_id: v4(),
                order_id,
                showtime_id,
                seat_id: seat.seatId,
                price: finalPrice,
            })
        })
    );
    return tickets;
};