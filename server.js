const express = require("express");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const sequelize = require("./models/db");

app.use(express.json());
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});