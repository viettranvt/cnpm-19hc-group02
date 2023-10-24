const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const rooms = PostgresConnection.define(
  'rooms',
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
    typeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    isBooked: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = rooms;