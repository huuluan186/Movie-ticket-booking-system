const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cinemadb', 'root', null, {
  host: 'localhost',
  port:3307,
  dialect: 'mysql',
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