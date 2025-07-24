const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  register,
  login,
  updateAccount,
  changePassword,
  deleteAccount,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.put("/update", auth, updateAccount);
router.put("/change-password", auth, changePassword);
router.delete("/delete", auth, deleteAccount);

module.exports = router;