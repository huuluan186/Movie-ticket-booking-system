import * as service from '../services/showtime';

export const createShowtime = async (req, res) => {
    try {
        const { movie_id } = req.params;
        const {
        showtime_date,
        showtime_starttime,
        showtime_endtime,
        price,
        cinema_id
        } = req.body;

        const response = await service.createShowtimesService({
        showtime_date,
        showtime_starttime,
        showtime_endtime,
        price,
        movie_id,
        cinema_id
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at create showtime controller: '+error
        });
    }
};

export const getShowtimesByQueryController = async (req, res)=> {
    try {
        const { cluster_id, movie_id } = req.query;
        const response = await service.getShowtimesByQueryService(cluster_id, movie_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at get showtimes controller: '+error
        });
    }
}

export const getShowtimeDetailController = async (req, res)=> {
    try {
        const { showtime_id } = req.params;
        const response = await service.getShowtimeDetailService(showtime_id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at get showtimes controller: '+error
        });
    }
}

export const deleteShowtimeController = async (req, res) => {
    try {
        const { showtime_id } = req.params;
        const response = await service.deleteShowtimeService({ showtime_id });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at delete showtime controller: ' + error
        });
    }
};

export const autoDeleteShowtimeController = async (req, res) => {
    try {
        const response = await service.autoDeleteShowtimesService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auto delete showtime controller: ' + error
        });
    }
};

export const updateShowtimeController = async (req, res) => {
    try {
        const { showtime_id } = req.params;
        const {
            showtime_date,
            showtime_starttime,
            showtime_endtime,
            price,
            movie_id,
            cinema_id,
        } = req.body;

        const response = await service.updateShowtimeService({
            showtime_id,
            showtime_date,
            showtime_starttime,
            showtime_endtime,
            price,
            movie_id,
            cinema_id
        });

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at update showtime controller: ' + error
        });
    }
}