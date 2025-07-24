const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const laporan = sequelize.define("laporan", {
  id_user: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  photo: {  
    type: DataTypes.STRING, 
    allowNull: true  
  },
  tanggal: {  
    type: DataTypes.DATE, 
    allowNull: false 
  },
  status: {  
    type: DataTypes.ENUM("Belum di proses", "Proses", "Selesai"), 
    allowNull: false 
  },
  lokasi: { 
    type: DataTypes.STRING, 
    allowNull: true  
  },
  kategori: { 
    type: DataTypes.ENUM("organik", "anorganik", "b3"), 
    allowNull: false 
  },
});

module.exports = laporan;