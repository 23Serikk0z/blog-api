// User.js
const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./Role"); // Добавьте эту строку
const UserRole = require("./UserRole");

const User = sequelize.define(
    "User",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        tableName: "users",
    }
);

User.belongsToMany(Role, { through: "UserRole" });
// User.belongsToMany(Role, { through: UserRole });

module.exports = User;
