const sequelize = require("../models/db");
const laporan = require("../models/laporan");

(async () => {
  try {
    await sequelize.sync({ force: true }); // Hapus semua dan buat ulang
    console.log("✅ Table created successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();
