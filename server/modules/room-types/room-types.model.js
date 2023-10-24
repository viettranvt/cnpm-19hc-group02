const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const roomTypes = PostgresConnection.define(
  'roomTypes',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    code: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    view: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    numOfBeds: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = roomTypes;