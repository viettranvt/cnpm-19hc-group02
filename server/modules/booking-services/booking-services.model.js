const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const bookingServices = PostgresConnection.define(
  'bookingServices',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    bookingId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    serviceId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = bookingServices;