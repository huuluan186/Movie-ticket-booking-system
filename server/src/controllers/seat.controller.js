import * as service from '../services/seat';

export const getCinemaSeatLayoutController = async (req, res) => {
    try {
        const {cinema_id} = req.params;
        const response = await service.getCinemaSeatLayoutService(cinema_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err:-1,
            msg:'Failed at get seats list controller: '+ error
        })
    }
} 