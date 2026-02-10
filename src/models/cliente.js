const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const cliente = sequelize.define('cliente', {
  cpf_cliente: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  nome_cliente: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  celular: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

module.exports = { cliente };
