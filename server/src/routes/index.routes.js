import authRouter from './auth.routes'
import userRouter from './user.routes'
import movieRouter from './movie.routes'
const initRoutes=(app)=>{
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/users', userRouter)
    app.use('/api/v1/movies',movieRouter)
    return app.use('/',(req,res)=>{
        res.send("server on...")
    })
}

export default initRoutes;