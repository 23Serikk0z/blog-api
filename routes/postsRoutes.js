const express = require("express");
const PostController = require("../controllers/PostController");
const { verifyToken } = require("../middleware/JWTValidator");
const { validatorCreatePost } = require("../middleware/validatorPost");
const upload = require("../config/multerConfig");

const router = express.Router();

router.post("/create-post", verifyToken, upload.single('image'), validatorCreatePost, PostController.createPost);
router.post("/:postId/update", verifyToken, upload.single('image'), validatorCreatePost, PostController.updatePost);
router.post("/:postId/like", verifyToken, PostController.like);

router.get("/get-post", verifyToken,  PostController.getPosts);
router.get("/get-post/:id", verifyToken, PostController.getPost);

module.exports = router;
