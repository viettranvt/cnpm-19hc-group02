const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const bookingFoods = PostgresConnection.define(
  'bookingFoods',
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
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    isConfirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = bookingFoods;