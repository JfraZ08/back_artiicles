const mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config();

const db= mysql.createConnection({
    host: process.env.DB_HOST_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV
});

db.connect((err) => {
    if (err) {
        console.log('Erreur lors de la connexion à la base de données : ', err)
    } else {
        console.log('Connexion effectué')
    }
})

module.exports = db;