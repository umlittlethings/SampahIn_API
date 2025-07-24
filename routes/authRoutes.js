const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { addToBlacklist } = require("../utils/tokenBlacklist");
const {
  register,
  login,
  updateAccount,
  changePassword,
  deleteAccount,
} = require("../controllers/authController");

const {
  authenticateToken,
  authorizeRole
} = require("../middleware/authMiddleware");

// Public
router.post("/register", register);
router.post("/login", login);

// Protected for all roles
router.put("/update", authenticateToken, updateAccount);
router.put("/change-password", authenticateToken, changePassword);
router.delete("/delete", authenticateToken, deleteAccount);

// Role-specific routes
router.get("/admin-only", authenticateToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Halo Admin" });
});

router.get("/petugas-data", authenticateToken, authorizeRole("admin", "petugas"), (req, res) => {
  res.json({ message: `Halo Petugas atau Admin` });
});

router.post("/logout", verifyToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  addToBlacklist(token);
  res.status(200).json({ message: "Logout successful" });
});


module.exports = router;