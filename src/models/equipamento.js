const {DataTypes} = require('sequelize');
const {sequelize} = require('../db.js');

const equipamento = sequelize.define('equipamento', {
  cod_equipamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  nome_maquina: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
});

module.exports = { equipamento };
