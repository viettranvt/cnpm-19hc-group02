const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const foodBills = PostgresConnection.define(
  'foodBills',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    usersOrderId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    amount: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    paymentType: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    paymentDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = foodBills;