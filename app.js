const bodyParser = require("body-parser");
const express = require("express");
const sequelize = require("./config/db");
const userRoutes = require("./routes/usersRoutes");
const postRoutes = require("./routes/postsRoutes");
const roleRoutes = require("./routes/rolesRoutes");
const models = require("./models/importModels");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/roles", roleRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
    res.status(404).json({ message: "Invalid route" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Server error" });
});

sequelize
    .authenticate()
    .then(() => console.log("DB CONNECTED SUCCESSFULLY"))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
