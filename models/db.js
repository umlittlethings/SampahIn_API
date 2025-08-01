// models/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const databaseUrl = process.env.DATABASE_URL; // isi dengan: mysql://root:...@...:3306/railway
if (!databaseUrl) {
  console.error("❌ Missing DATABASE_URL env var");
  process.exit(1);
}

console.log("🔎 Using DB URL:", databaseUrl.replace(/\/\/.*?:.*?@/, "//****:****@")); // mask password

const sequelize = new Sequelize(databaseUrl, {
  dialect: "mysql",
  logging: false,
  retry: {
    max: 5, // coba ulang beberapa kali kalau belum siap
  },
  dialectOptions: {
    connectTimeout: 10000, // 10 detik timeout
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection established");
  } catch (err) {
    console.error("❌ DB connection authenticate failed:", err);
  }
})();

module.exports = sequelize;
