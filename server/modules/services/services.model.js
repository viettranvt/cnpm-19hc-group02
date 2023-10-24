const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const services = PostgresConnection.define(
  'services',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    type: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = services;