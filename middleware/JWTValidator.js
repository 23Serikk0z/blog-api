const JWT = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    
    try {
        token = token.replace("Bearer", "").trim();
        const decodedToken = JWT.verify(token, process.env.JWT_SECRET);
        req.user_id = decodedToken.user_id;
        next();
    } catch (error) {
        console.error("Error verify token: ", error);
        res.status(401).json({ message: "Invalid token" });
    }
};
