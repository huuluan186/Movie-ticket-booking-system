import * as movieService from '../services/movie'

export const getMovieStatuses = async (req,res) => {
    try {
        const response = await movieService.getMovieStatusesService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at movie controller : ' + error
        })
    }
}