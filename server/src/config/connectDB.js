require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port:process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging:false
});

const connectDatabase= async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database: ', error);
      }
}

export default connectDatabase;