const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const permissions = PostgresConnection.define(
  'permissions',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    code: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = permissions;