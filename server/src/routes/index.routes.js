import authRouter from './auth.routes'
import userRouter from './user.routes'
const initRoutes=(app)=>{
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/user', userRouter)
    return app.use('/',(req,res)=>{
        res.send("server on...")
    })
}

export default initRoutes;