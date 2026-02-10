const {sequelize} = require('../db.js');
const {servico} = require('./servico.js');
const {equipamento} = require('./equipamento.js');
const {DataTypes} = require('sequelize');

const servico_equipamento = sequelize.define(
  'servico_equipamento',
  {},
  { timestamps: false }
);

servico.belongsToMany(equipamento, {
  through: servico_equipamento,
  foreignKey: 'cod_servico',
});

equipamento.belongsToMany(servico, {
  through: servico_equipamento,
  foreignKey: 'cod_equipamento',
});

module.exports = {servico_equipamento};
