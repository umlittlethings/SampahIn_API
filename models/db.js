const { Sequelize } = require("sequelize");
require("dotenv").config();

const buildFromParts = () => {
  // Railway environment variables
  const host = process.env.MYSQLHOST || process.env.DB_HOST || process.env.DATABASE_HOST;
  const user = process.env.MYSQLUSER || process.env.DB_USER || process.env.DATABASE_USER;
  const pass = process.env.MYSQLPASSWORD || process.env.DB_PASS || process.env.DATABASE_PASSWORD;
  const db = process.env.MYSQLDATABASE || process.env.DB_NAME || process.env.DATABASE_NAME;
  const port = process.env.MYSQLPORT || process.env.DB_PORT || process.env.DATABASE_PORT || 3306;

  console.log("🔍 Environment check:", {
    MYSQLHOST: process.env.MYSQLHOST,
    DB_HOST: process.env.DB_HOST,
    DATABASE_HOST: process.env.DATABASE_HOST,
    MYSQLUSER: process.env.MYSQLUSER,
    DB_USER: process.env.DB_USER,
    DATABASE_USER: process.env.DATABASE_USER,
    MYSQLDATABASE: process.env.MYSQLDATABASE,
    DB_NAME: process.env.DB_NAME,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET"
  });

  if (!host || !user || !pass || !db) {
    console.error("❌ Missing required DB env vars:", {
      host, user, pass: pass ? "*****" : undefined, db, port
    });
    console.error("❌ Please check your Railway environment variables");
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
