


exports.validatorCreatePost = (req, res, next) =>{
    const { title, content, image } = req.body;

    if(!title || !content) return res.status(400).json({status: false, message: "All fields are required"});

    if(content.length < 10) return res.status(400).json({status: false, message: "Content must be at least 10 characters"});

    next();
};
