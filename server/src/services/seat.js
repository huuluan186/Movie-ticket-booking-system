import db from '../models/index.js';
import { nanoid } from 'nanoid';

export const createSeatsForCinemaService = (cinema_id) => new Promise(async (resolve, reject) => {
    try {
        // Kiểm tra xem đã có ghế chưa
        const existingSeats = await db.Seat.findOne({ where: { cinema_id } });
        if (existingSeats) {
            return resolve({
                err: 0,
                msg: 'Rạp đã có danh sách ghế. Không cần tạo lại.',
            });
        }
        
        const cinema = await db.Cinema.findOne({
            where: { cinema_id },
            attributes: ['rowCount', 'columnCount'],
            raw: true
        });

        if (!cinema) return resolve({ err: 1, msg: 'Rạp không tồn tại!' });

        const seats = [];
        for (let row = 1; row <= cinema.rowCount; row++) {
            for (let col = 1; col <= cinema.columnCount; col++) {
                seats.push({
                    seat_id: nanoid(),
                    row,
                    column: col,
                    type: row > 3 ? 'VIP' : 'Normal',
                    cinema_id
                });
            }
        }

        await db.Seat.bulkCreate(seats);
        resolve({ err: 0, msg: 'Tạo ghế thành công!' });
    } catch (error) {
        reject(error);
    }
});

export const getCinemaSeatLayoutService = (cinema_id, showtime_id) => new Promise(async (resolve, reject) => {
    try {
        const cinema = await db.Cinema.findOne({
            where: { cinema_id },
            attributes: ['cinema_id', 'rowCount', 'columnCount'],
            raw: true
        });

        const showtime = await db.Showtime.findOne({
            where: { showtime_id },
            attributes: ['showtime_id'],
            raw: true
        });

        if (!cinema) return resolve({ err: 1, msg: 'Rạp không tồn tại!' });
        if (!showtime) return resolve({ err: 1, msg: 'Suất chiếu không tồn tại!' });

        const allSeats = await db.Seat.findAll({
            where: { cinema_id },
            attributes: ['seat_id', 'row', 'column', 'type'],
            raw: true
        });

        const bookedTickets = await db.Ticket.findAll({
            where: { showtime_id },
            attributes: ['seat_id'],
            raw: true
        });
        const bookedSeatIds = bookedTickets.map(t => t.seat_id);

        const seatLayout = [];
        for (let row = 1; row <= cinema.rowCount; row++) {
            const seats = [];
            for (let col = 1; col <= cinema.columnCount; col++) {
                const existingSeat = allSeats.find(s => s.row === row && s.column === col);
                if (!existingSeat) continue;

                seats.push({
                    seatId: existingSeat.seat_id,
                    row,
                    column: col,
                    type: existingSeat.type,
                    booked: bookedSeatIds.includes(existingSeat.seat_id)
                });
            }
            seatLayout.push({ row, seats });
        }

        resolve({
            err: 0,
            msg: 'Lấy layout ghế thành công!',
            response: {
                cinemaId: cinema.cinema_id,
                seat_layout: seatLayout
            }
        });
    } catch (error) {
        reject(error);
    }
});