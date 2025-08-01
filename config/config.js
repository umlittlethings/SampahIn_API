require('dotenv').config();

const getEnv = (prodName, altName) => process.env[prodName] || process.env[altName];

module.exports = {
  development: {
    username: getEnv("DB_USER", "MYSQLUSER"),
    password: getEnv("DB_PASS", "MYSQLPASSWORD"),
    database: getEnv("DB_NAME", "MYSQLDATABASE"),
    host: getEnv("DB_HOST", "MYSQLHOST"),
    port: process.env.MYSQLPORT || 3306,
    dialect: 'mysql'
  },
  production: {
    username: getEnv("DB_USER", "MYSQLUSER"),
    password: getEnv("DB_PASS", "MYSQLPASSWORD"),
    database: getEnv("DB_NAME", "MYSQLDATABASE"),
    host: getEnv("DB_HOST", "MYSQLHOST"),
    port: process.env.MYSQLPORT || 3306,
    dialect: 'mysql'
  }
};