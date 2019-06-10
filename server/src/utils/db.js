const mysql = require('mysql2');

//Conexão com o banco de dados 
const dbConfig = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Db123456',
    database: 'hospweb'
}
const db = mysql.createPool(dbConfig);

module.exports = db.promise();