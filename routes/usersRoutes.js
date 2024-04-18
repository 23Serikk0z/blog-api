const express = require("express");
const UserController = require("../controllers/UserController");
const { validatorRegisterUser, validatorLoginUser } = require("../middleware/validatorUser");
const { verifyToken } = require("../middleware/JWTValidator");

const router = express.Router();

router.post("/register", validatorRegisterUser, UserController.registerUser);
router.post("/login", validatorLoginUser, UserController.loginUser);

router.get("/me", verifyToken, UserController.getMe);

module.exports = router;
