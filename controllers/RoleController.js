const Role = require("../models/Role");

exports.createRole = async (req, res) => {
    try {
        const { value, description } = req.body;

        const existRole = await Role.findOne({ where: { value } });
        if (existRole)
            return res
                .status(400)
                .json({ status: false, message: "Role already exists" });

        const role = await Role.create({ value, description });
        return res
            .status(201)
            .json({ status: true, message: "Role created", role: role });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};
