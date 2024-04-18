const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User"); // Добавляем импорт модели User
const UserRole = require("./UserRole");

const Role = sequelize.define(
    "Role", // Меняем на единственное число "Role"
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: "roles",
    }
);

// Role.belongsToMany(User, { through: UserRole });

module.exports = Role;
