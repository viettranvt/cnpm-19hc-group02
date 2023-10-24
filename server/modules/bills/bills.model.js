const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const bills = PostgresConnection.define(
  'bills',
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
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    paymentType: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    paymentDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    isPayment: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = bills;
