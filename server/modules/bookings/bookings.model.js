const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const bookings = PostgresConnection.define(
  'bookings',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    roomId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    isCheckOut: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = bookings;