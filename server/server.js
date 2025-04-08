import express from 'express';
import initRoutes from './src/routes/index.routes';
import cors from 'cors'
import connectDatabase from './src/config/connectDB';
require('dotenv').config()
const app = express()

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:["POST","GET","PUT","DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

initRoutes(app)
connectDatabase()

const port=process.env.PORT || 8888
app.listen(port,()=>{
    console.log(`Website listening on port ${port}`)
})