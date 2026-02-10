const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");
const { cabeleireiro } = require("./cabeleireiro.js");
const { cliente } = require("./cliente.js");

const servico = sequelize.define("servico", {
  cod_servico: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  data_servico: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },

  pagamento: {
    type: DataTypes.STRING(40),
    allowNull: true,
  },

  cpf_cabeleireiro: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  cpf_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  
});

servico.belongsTo(cabeleireiro, {
  foreignKey: "cpf_cabeleireiro",
  onDelete: "CASCADE",
});

servico.belongsTo(cliente, {
  foreignKey: "cpf_cliente",
  onDelete: "CASCADE",
});

module.exports = { servico };
