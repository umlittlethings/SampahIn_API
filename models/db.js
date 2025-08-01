const { Sequelize } = require("sequelize");
require("dotenv").config();

const buildFromParts = () => {
  // prefer Railway-style names
  const host = process.env.MYSQLHOST || process.env.DB_HOST;
  const user = process.env.MYSQLUSER || process.env.DB_USER;
  const pass = process.env.MYSQLPASSWORD || process.env.DB_PASS;
  const db = process.env.MYSQLDATABASE || process.env.DB_NAME;
  const port = process.env.MYSQLPORT || 3306;

  if (!host || !user || !pass || !db) {
    console.error("❌ Missing required DB env vars:", {
      host, user, pass: pass ? "*****" : undefined, db, port
    });
    process.exit(1);
  }

  return {
    uri: null,
    options: {
      database: db,
      username: user,
      password: pass,
      params: {
        host,
        port,
        dialect: "mysql",
      }
    }
  };
};

let sequelize;

if (process.env.DATABASE_URL) {
  const masked = process.env.DATABASE_URL.replace(/\/\/.*?:.*?@/, "//****:****@");
  console.log("🔎 Using DATABASE_URL:", masked);
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    logging: false,
    retry: { max: 5 },
    dialectOptions: { connectTimeout: 10000 }
  });
} else {
  const { options } = buildFromParts();
  console.log("🔎 Using parts for DB connection:", {
    host: options.params.host,
    username: options.username,
    database: options.database,
    port: options.params.port,
    env: process.env.NODE_ENV
  });
  sequelize = new Sequelize(
    options.database,
    options.username,
    options.password,
    {
      host: options.params.host,
      port: options.params.port,
      dialect: options.params.dialect,
      logging: false,
      retry: { max: 5 },
      dialectOptions: { connectTimeout: 10000 }
    }
  );
}

// health check / authenticate
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection established");
  } catch (err) {
    console.error("❌ DB connection authenticate failed:", err);
  }
})();

module.exports = sequelize;
