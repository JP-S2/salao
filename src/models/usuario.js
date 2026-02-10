const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const usuario = sequelize.define("usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nome_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },

  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  tipo: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
});

module.exports = { usuario };
