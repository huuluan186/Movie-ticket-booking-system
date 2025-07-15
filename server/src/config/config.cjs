/**
 * CONFIG DÀNH CHO CONTAINER
 * - luôn dùng host = 'db'
 * - đọc biến từ file .env ở gốc dự án (được docker‑compose mount vào)
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = {
    development: {
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'cinemadb',
        host: process.env.DB_HOST || 'db',
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
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'cinemadb',
        host: process.env.DB_HOST || 'db',
        port: process.env.DB_PORT || 3306,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
    },
};
