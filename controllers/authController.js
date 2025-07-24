const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
require("dotenv").config();

const register = async (req, res) => {
  const { name, birthdate, phone, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const stmt = `INSERT INTO users (name, birthdate, phone, email, password) VALUES (?, ?, ?, ?, ?)`;
  db.run(stmt, [name, birthdate, phone, email, hashed], function (err) {
    if (err) return res.status(400).json({ error: "Email already exists" });
    res.json({ message: "Registered successfully", id: this.lastID });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(400).json({ error: "Invalid email" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ message: "Login successful", token });
  });
};

const updateAccount = (req, res) => {
  const { name, birthdate, phone } = req.body;
  const userId = req.user.id;

  db.run(`UPDATE users SET name = ?, birthdate = ?, phone = ? WHERE id = ?`, [name, birthdate, phone, userId], function (err) {
    if (err) return res.status(500).json({ error: "Update failed" });
    res.json({ message: "Account updated" });
  });
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  db.get(`SELECT password FROM users WHERE id = ?`, [userId], async (err, user) => {
    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(400).json({ error: "Old password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    db.run(`UPDATE users SET password = ? WHERE id = ?`, [hashed, userId]);
    res.json({ message: "Password updated" });
  });
};

const deleteAccount = (req, res) => {
  db.run(`DELETE FROM users WHERE id = ?`, [req.user.id], function (err) {
    if (err) return res.status(500).json({ error: "Delete failed" });
    res.json({ message: "Account deleted" });
  });
};

module.exports = {
  register,
  login,
  updateAccount,
  changePassword,
  deleteAccount,
};