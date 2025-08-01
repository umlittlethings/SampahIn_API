// scripts/migrate.js
const sequelize = require("../models/db");
require("../models/user");
require("../models/laporan");

(async () => {
  try {
    const isProd = process.env.NODE_ENV === "production";
    await sequelize.sync({ force: !isProd }); 
    console.log("✅ Tables synced successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();
