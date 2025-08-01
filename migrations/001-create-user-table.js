const sequelize = require("../models/db");
const User = require("../models/user");

(async () => {
  try {
    await sequelize.sync({ force: true }); 
    console.log("✅ Table created successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
})();
