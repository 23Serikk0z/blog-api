const express = require("express");
const RoleController = require("../controllers/RoleController");
const { verifyToken } = require("../middleware/JWTValidator");
const { validatorCreateRole } = require("../middleware/validatorRole");

const router = express.Router();

router.post("/role", verifyToken, validatorCreateRole,RoleController.createRole);

module.exports = router;