const express = require("express");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const laporanRoutes = require("./routes/laporanRoutes");

const sequelize = require("./models/db");

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", laporanRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.sync({ alter: true }); 
    //await initializeRoles();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;


// const express = require("express");
// const app = express();
// require("dotenv").config();

// const laporanRoutes = require("./routes/laporanRoutes");
// const authRoutes = require("./routes/authRoutes");
// const sequelize = require("./models/db");

// app.use(express.json());
// app.use("/api", authRoutes);
// app.use("/api", laporanRoutes);

// const PORT = process.env.PORT || 5000;

// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });