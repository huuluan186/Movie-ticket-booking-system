import express from 'express';
import initRoutes from './src/routes/index.routes.js';
import cors from 'cors'
import connectDatabase from './src/config/connectDB.js';
import { swaggerSpec, swaggerUi } from './src/config/swagger.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:["POST","GET","PUT","DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/images', express.static('src/public/images'));

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
initRoutes(app)
connectDatabase()

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Website listening on port ${port}`)
})

//Import file cron (chạy job định kỳ)
import './cron.js';