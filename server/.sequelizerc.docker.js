// Dành riêng cho Docker
const path = require('path');

module.exports = {
    'config'         : path.resolve(__dirname, 'src/config/config.cjs'), // docker dùng config.cjs
    'models-path'    : path.resolve(__dirname, 'src/models'),
    'seeders-path'   : path.resolve(__dirname, 'src/seeders'),
    'migrations-path': path.resolve(__dirname, 'src/migrations'),
};
