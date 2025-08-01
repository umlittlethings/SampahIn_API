const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  birthdate: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("user", "petugas", "admin"),
    allowNull: false,
    defaultValue: "user"
  },
});

module.exports = User;
