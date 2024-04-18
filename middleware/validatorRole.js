




exports.validatorCreateRole = (req, res, next) =>{
    const { value, description } = req.body;

    if(!value || !description) return res.status(400).json({status: false, message: "All fields are required"});

    if(value.length < 3) return res.status(400).json({status: false, message: "Role name must be at least 3 characters"});

    next();
};
