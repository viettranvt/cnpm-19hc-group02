const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const orderFoods = PostgresConnection.define(
  'orderFoods',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    bookingFoodsId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    foodId: {
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
module.exports = orderFoods;