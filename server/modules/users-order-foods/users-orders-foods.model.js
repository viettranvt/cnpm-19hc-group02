const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const usersOderFoods = PostgresConnection.define(
  'usersOrderFoods',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    usersOderId: {
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
module.exports = usersOderFoods;