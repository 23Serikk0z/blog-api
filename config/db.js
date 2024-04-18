const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.db_name, process.env.user, process.env.pass, {
    host: process.env.host,
    dialect: 'postgres'
})

module.exports = sequelize;

