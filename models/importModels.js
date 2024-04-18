const sequelize = require("../config/db");
const Like = require("./Like");
const Post = require("./Post");
const Role = require("./Role");
const User = require("./User");
const UserRole = require("./UserRole");


const models = [User, Post, Like, Role, UserRole];

sequelize.sync({force: false})
    .then(()=>{
        console.log('All models were synchronized successfully');
    })
    .catch(err => {
        console.error('Error w sync database: ', err);
    })

module.exports = models;