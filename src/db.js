const { Sequelize } = require('sequelize');

const db_name = 'salao';
const db_owner = 'postgres'
const db_password = '030609060810781107';

const sequelize = new Sequelize(db_name, db_owner, db_password, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

module.exports = { sequelize };
