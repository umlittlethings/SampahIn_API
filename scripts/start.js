// scripts/start.js
const { spawn } = require('child_process');

async function runMigration() {
  return new Promise((resolve, reject) => {
    console.log("🔄 Running database migration...");
    const migrate = spawn('node', ['scripts/migrate.js'], {
      stdio: 'inherit',
      env: process.env
    });

    migrate.on('close', (code) => {
      if (code === 0) {
        console.log("✅ Migration completed successfully");
        resolve();
      } else {
        console.error("❌ Migration failed with code:", code);
        reject(new Error(`Migration failed with code ${code}`));
      }
    });

    migrate.on('error', (err) => {
      console.error("❌ Migration error:", err);
      reject(err);
    });
  });
}

async function startServer() {
  try {
    // Wait a bit for database to be ready
    console.log("⏳ Waiting for database to be ready...");
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Run migration
    await runMigration();
    
    // Start the server
    console.log("🚀 Starting server...");
    const server = spawn('node', ['server.js'], {
      stdio: 'inherit',
      env: process.env
    });

    server.on('close', (code) => {
      console.log(`Server exited with code ${code}`);
      process.exit(code);
    });

    server.on('error', (err) => {
      console.error("Server error:", err);
      process.exit(1);
    });

  } catch (error) {
    console.error("❌ Failed to start application:", error);
    process.exit(1);
  }
}

startServer(); 