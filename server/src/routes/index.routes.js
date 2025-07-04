import configRouter from './config.routes'
import authRouter from './auth.routes'
import userRouter from './user.routes'
import movieRouter from './movie.routes'
import cinemaChainRouter from './cinemaChain.routes'
import cinemaClusterRouter from './cinemaCluster.routes'
import cinemaRouter from './cinema.routes'
import showtimeRouter from './showtime.routes'
import seatRouter from './seat.routes'
import statisticRouter from './statistic.routes'

const initRoutes=(app)=>{
    app.use('/api/v1/configs', configRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/movies', movieRouter)
    app.use('/api/v1/cinemachains', cinemaChainRouter)
    app.use('/api/v1/cinemaclusters', cinemaClusterRouter)
    app.use('/api/v1/cinemas', cinemaRouter)
    app.use('/api/v1/showtimes', showtimeRouter)
    app.use('/api/v1/seats', seatRouter)
    app.use('/api/v1/statistics', statisticRouter)
    return app.use('/',(req,res)=>{
        res.send("server on...")
    })
}

export default initRoutes;