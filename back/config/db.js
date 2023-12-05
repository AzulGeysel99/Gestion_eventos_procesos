const mysql = require('mysql');
require('dotenv').config();

class DatabaseClass {
  constructor() {
    this.connection = undefined;
    this.config = {};
  }

  createConnection() {
    this.setConfig();
    this.connection = mysql.createConnection(this.config);
  }

  getConnection() {
    if (!this.connection) this.createConnection();

    return this.connection;
  }

  setConfig() {
    this.config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
  }

  getConfig() {
    return this.setConfig();
  }

  executeQuery(queryString, params = []) {
    return new Promise((resolve, reject) => {
      this.getConnection().query(queryString, params, (error, result) => {
        if (error) {
          console.log('Error connecting to the database', error);
          reject(error);
        }
        resolve(result);
      });
    });
  }
}

module.exports = { Database: new DatabaseClass() };
