import * as service from '../services/seat';

export const createSeatsForCinemaController = async (req, res) => {
    const { cinema_id } = req.params;
    try {
        const response = await service.createSeatsForCinemaService(cinema_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at create seats for cinema controller: '+ error
        })
    }
};

export const getCinemaSeatLayoutController = async (req, res) => {
    try {
        const { cinema_id, showtime_id } = req.query;
        const response = await service.getCinemaSeatLayoutService(cinema_id, showtime_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at get seats list controller: '+ error
        })
    }
} 