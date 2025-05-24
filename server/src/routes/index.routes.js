import authRouter from './auth.routes'
import userRouter from './user.routes'
import movieRouter from './movie.routes'
import cinemaChainRouter from './cinemaChain.routes'
import cinemaClusterRouter from './cinemaCluster.routes'
import cinemaRouter from './cinema.routes'
const initRoutes=(app)=>{
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/movies',movieRouter)
    app.use('/api/v1/cinemachains',cinemaChainRouter)
    app.use('/api/v1/cinemaclusters',cinemaClusterRouter)
    app.use('/api/v1/cinemas',cinemaRouter)
    return app.use('/',(req,res)=>{
        res.send("server on...")
    })
}

export default initRoutes;