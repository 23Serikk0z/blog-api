const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Role = require("../models/Role");
require("dotenv").config();

exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const alreadyExists = await User.findOne({ where: { email } });
        if (alreadyExists)
            return res
                .status(400)
                .json({ status: false, message: "Already the email used" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email: email,
            password: hashedPassword,
        });

        const userRole = await Role.findOne({where: { value: "User" }});

        if(userRole) {
            await user.setRoles([userRole]);
        } else{
            console.error('Role "User" not found');
        }
        return res.status(201).json({
            status: true,
            messsage: "User successfully created!",
            user: user,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, messsage: "Server error" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(400).json({
                status: false,
                message: "Incorrect email or password",
            });

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched)
            return res.status(400).json({
                status: false,
                message: "Incorrect email or password",
            });

        const payload = { user_id: user.id, email: user.email };
        const token = JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        return res.status(200).json({
            status: true,
            message: "Successfully logged",
            token: token,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, messsage: "Server error" });
    }
};

exports.getMe = async (req, res) => {
    try {
        const userId = req.user_id;
        const user = await User.findByPk(userId);

        if (!user)
            return res.status(400).json({
                status: false,
                message: "Not found",
            });

        return res.status(200).json({
            status: true,
            message: "successfully fetched",
            user: user,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: false, messsage: "Server error" });
    }
};