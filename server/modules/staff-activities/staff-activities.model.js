const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const staffActivities = PostgresConnection.define(
  'staffActivities',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = staffActivities;