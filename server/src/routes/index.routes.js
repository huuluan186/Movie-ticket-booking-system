import configRouter from './config.routes.js'
import authRouter from './auth.routes.js'
import userRouter from './user.routes.js'
import movieRouter from './movie.routes.js'
import cinemaChainRouter from './cinemaChain.routes.js'
import cinemaClusterRouter from './cinemaCluster.routes.js'
import cinemaRouter from './cinema.routes.js'
import showtimeRouter from './showtime.routes.js'
import seatRouter from './seat.routes.js'
import statisticRouter from './statistic.routes.js'

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