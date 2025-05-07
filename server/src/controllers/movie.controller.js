import * as service from '../services/movie'

export const getMovieStatuses = async (req,res) => {
    try {
        const response = await service.getMovieStatusesService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at movie controller : ' + error
        })
    }
}

export const createMovie = async (req, res) => {
    try {
        const payload = req.body ;
    
        const missingKeys = [
            'title',
            'country',
            'genre',
            'duration',
            'release_date',
            'status'
        ].filter(key => !(key in payload));
    
        if (missingKeys.length) {
            return res.status(400).json({
            err: 1,
            msg: `Missing required fields: ${missingKeys.join(', ')}`
            });
        }
    
        const response = await service.createMovieService(payload);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to create movie controller: ' + error.message,
        })
    }
}
  
export const getMovieDetail = async (req, res) => {
    const { movieId } = req.params;
    try {
        const response = await service.getMovieDetailService(movieId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed to get movie detail controller: ' + error.message,
        })
    }
}
