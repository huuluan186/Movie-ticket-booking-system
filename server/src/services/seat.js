import db from '../models';
import {nanoid} from 'nanoid';

export const getCinemaSeatLayoutService = (cinema_id) => new Promise(async (resolve, reject) => {
    try {
        // Lấy thông tin rạp
        const cinema = await db.Cinema.findOne({
            where: { cinema_id },
            attributes: ['cinema_id', 'rowCount', 'columnCount'],
            raw: true
        });

        if (!cinema) {
            return resolve({
                err: 1,
                msg: 'Rạp không tồn tại!'
            });
        }

        // Lấy danh sách ghế đã lưu trong DB (nếu có)
        const existingSeats = await db.Seat.findAll({
            where: { cinema_id },
            attributes: ['seat_id', 'row', 'column', 'type', 'booked'],
            raw: true
        });

        // Tạo layout ghế động
        const seatLayout = [];
        for (let row = 1; row <= cinema.rowCount; row++) {
            const seats = [];
            for (let col = 1; col <= cinema.columnCount; col++) {
                // Kiểm tra xem ghế đã tồn tại trong DB chưa
                const existingSeat = existingSeats.find(
                    seat => seat.row === row && seat.column === col
                );

                seats.push({
                    seatId : existingSeat ? existingSeat.seat_id : nanoid(6),
                    row,
                    column: col,
                    type: existingSeat ? existingSeat.type : (row > 3 ? 'VIP' : 'Normal'), 
                    booked: existingSeat ? existingSeat.booked : false 
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