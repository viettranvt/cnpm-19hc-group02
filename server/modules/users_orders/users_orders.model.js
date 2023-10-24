const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const usersOders = PostgresConnection.define(
  'usersOrders',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userFullName: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = usersOders;