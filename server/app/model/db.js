const mysql = require('mysql');
const dbConfig = require('../config/db.config');

/**
 * Creates a connection to the MySQL database
 *
 * @constant {object} connection - The connection point to the database
 */
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

module.exports = connection;
