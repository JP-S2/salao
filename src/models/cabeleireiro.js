const {DataTypes} = require('sequelize');
const {sequelize} = require('../db');

const cabeleireiro = sequelize.define('cabeleireiro', {
  cpf_cabeleireiro: {
    type: DataTypes.STRING(50),
    primaryKey: true,
  },
  nome_cabeleireiro: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  especializacao: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  celular: {
    type: DataTypes.STRING(50),
    allowNull: true
  },

});

module.exports = { cabeleireiro };
