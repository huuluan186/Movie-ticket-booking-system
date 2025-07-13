import db from '../models/index.js';
import { Op, fn, col } from 'sequelize';

//thống kế lọc theo phim
export const getRevenueByMovie = (filters) => new Promise(async (resolve, reject) => {
    try {
        const where = {};

        if (filters.start_date && filters.end_date) {
            where.createdAt = {
                [Op.between]: [new Date(filters.start_date), new Date(filters.end_date)]
            };
        }

        if (filters.movie_id) {
            where.movie_id_snapshot = filters.movie_id ;
        }

        const response = await db.Ticket.findAll({
            where,
            attributes: [
                'movie_id_snapshot',
                'movie_title_snapshot',
                [fn('COUNT', col('ticket_id')), 'total_tickets'],
                [fn('SUM', col('price_snapshot')), 'total_revenue']
            ],
            group: ['movie_id_snapshot', 'movie_title_snapshot'],
            raw: true
        });

        resolve({ 
            err: response ? 0 : 1, 
            msg: response ? 'Thống kê theo phim thành công!' : 'Thống kê theo phim thất bại', 
            response
        });
    } catch (error) {
        reject(error);
    }
});

//thống kế lọc theo cụm rạp
export const getRevenueByCluster = (filters) => new Promise(async (resolve, reject) => {
    try {
        const where = {};

        if (filters.start_date && filters.end_date) {
            where.createdAt = {
                [Op.between]: [new Date(filters.start_date), new Date(filters.end_date)]
            };
        }

        if (filters.cluster_id) {
            where.cluster_id_snapshot = filters.cluster_id ;
        }

        const response = await db.Ticket.findAll({
            where,
            attributes: [
                'cluster_id_snapshot',
                'cluster_name_snapshot',
                [fn('COUNT', col('ticket_id')), 'total_tickets'],
                [fn('SUM', col('price_snapshot')), 'total_revenue']
            ],
            group: ['cluster_id_snapshot', 'cluster_name_snapshot'],
            raw: true
        });

        resolve({ 
            err: response ? 0 : 1, 
            msg: response ? 'Thống kê theo cụm rạp thành công!' : 'Thống kê theo cụm rạp thất bại', 
            response
        });
    } catch (error) {
        reject(error);
    }
});
