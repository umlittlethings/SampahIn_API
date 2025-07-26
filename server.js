const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const laporanRoutes = require("./routes/laporanRoutes");
const sequelize = require("./models/db");

app.use(cors()); 
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", laporanRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.sync({ alter: true });
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