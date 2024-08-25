//  /back_articles/config/database.js

const mysql = require('mysql2/promise');
const dotenv = require('dotenv')
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV
});


module.exports = pool;