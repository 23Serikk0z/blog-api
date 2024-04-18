const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserRole = sequelize.define(
    "UserRole", // Название таблицы
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: "user_roles", // Имя таблицы в базе данных
    }
);

module.exports = UserRole;