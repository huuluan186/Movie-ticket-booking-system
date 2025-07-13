import * as service from '../services/order.js';

export const createOrderController = async (req, res) => {
    const { user_id } = req.user;
    const { showtime_id, seats, total_amount } = req.body;
    try {
        const response = await service.createOrderService({ user_id, showtime_id, seats, total_amount });
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at create order controller: ' + error,
        });
    }
};

export const getOrderHistoryController = async (req, res) => {
    const { user_id } = req.user;
    try {
        const response = await service.getOrderHistoryService(user_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at get order list controller: ' + error
        });
    }
}