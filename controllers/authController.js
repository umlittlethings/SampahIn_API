const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { name, birthdate, phone, email, password, role = "user" } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, birthdate, phone, email, password: hashed, role });
    res.json({ message: "Registered successfully", id: user.id, role: user.role });
  } catch (err) {
    res.status(400).json({ error: "Email already exists or invalid input" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid email" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ message: "Login successful", token, role: user.role });
};

const updateAccount = async (req, res) => {
  const { name, birthdate, phone } = req.body;
  try {
    await User.update({ name, birthdate, phone }, { where: { id: req.user.id } });
    res.json({ message: "Account updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findByPk(req.user.id);
  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) return res.status(400).json({ error: "Old password is incorrect" });

  const hashed = await bcrypt.hash(newPassword, 10);
  await User.update({ password: hashed }, { where: { id: req.user.id } });
  res.json({ message: "Password updated" });
};

const deleteAccount = async (req, res) => {
  await User.destroy({ where: { id: req.user.id } });
  res.json({ message: "Account deleted" });
};

module.exports = {
  register,
  login,
  updateAccount,
  changePassword,
  deleteAccount,
};
