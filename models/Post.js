const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Post = sequelize.define(
    "posts",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "posts",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
);

User.hasMany(Post);
Post.belongsTo(User);

module.exports = Post;
