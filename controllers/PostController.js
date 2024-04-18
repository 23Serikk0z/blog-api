const sequelize = require("../config/db");
const Like = require("../models/Like");
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file.filename;
        const userId = req.user_id;
        if (!userId)
            return res
                .status(400)
                .json({ status: false, message: "User not found" });

        const post = await Post.create({
            title: title,
            content: content,
            image: image,
            userId: req.user_id,
        });

        return res
            .status(201)
            .json({ status: true, message: "Post created", post: post });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                "id",
                "title",
                "content",
                [sequelize.fn("COUNT", sequelize.col("likes.id")), "likeCount"],
            ],
            include: [
                {
                    model: Like,
                    as: "likes",
                    attributes: [],
                },
            ],
            group: ["posts.id"],
        });
        return res.status(200).json({
            status: true,
            message: "Fetching all posts",
            posts: posts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post)
            return res
                .status(400)
                .json({ status: false, message: "Post not found" });

        return res.status(200).json({
            status: true,
            message: "Fetching post",
            post: post,
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file.filename;
        const postId = req.params.postId
        const post = await Post.findByPk(postId);
        if (!post)
            return res
                .status(400)
                .json({ status: false, message: "Post not found" });

        const updatedPost = await post.update({ title, content, image: image });
        return res.status(201).json({
            status: true,
            message: "Post successfully updated",
            post: updatedPost,
        });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

exports.like = async (req, res) => {
    try {
        const userId = req.user_id;
        const postId = req.params.postId;

        const existingLike = await Like.findOne({
            where: { userId: userId, postId: postId },
        });
        if (existingLike) {
            await existingLike.destroy();
            return res
                .status(201)
                .json({ status: true, message: "Unliked the post" });
        }

        const newLike = await Like.create({
            userId: userId,
            postId: postId,
        });

        return res
            .status(201)
            .json({ status: true, message: "Liked the post" });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};
