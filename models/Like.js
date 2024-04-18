const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Post = require("./Post");


const Like = sequelize.define(
    "likes",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        tableName: "likes",
    }
);

User.hasMany(Like);
Like.belongsTo(User);

Post.hasMany(Like);
Like.belongsTo(Post);

module.exports = Like;