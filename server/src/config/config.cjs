require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env') });

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'cinemadb',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
    },
    test: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || null,
        database: process.env.DB_NAME || 'cinemadb',
        host: process.env.DB_HOST || 'db',          // ✅ phải là 'db'
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
    },
    production: {
        username: 'root',
        password: null,
        database: 'prod',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
