const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const foods = PostgresConnection.define(
  'foods',
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
    group: {
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
module.exports = foods;