

exports.validatorRegisterUser = (req, res, next) =>{
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({status: false, message: "All fields are required"});

    if(password.length < 6) return res.status(400).json({status: false, message: "Password must be at least 6 characters"});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return res.status(400).json({status: false, message: "Invalid email format"});

    next();
}

exports.validatorLoginUser = (req, res, next) => {
    
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({status: false, message: "All fields are required"});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return res.status(400).json({status: false, message: "Invalid email format"});

    next();

}