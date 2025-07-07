import * as service from '../services/statistic';

export const getRevenueByMovie = async (req, res) => {
    try {
        const response = await service.getRevenueByMovie(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at get revenue by movie controller: '+error
        });
    }
};

export const getRevenueByCluster = async (req, res) => {
    try {
        const response = await service.getRevenueByCluster(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at get revenue by cluster controller: '+error
        });
    }
};