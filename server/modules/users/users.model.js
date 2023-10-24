const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const users = PostgresConnection.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    fullName: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    identityId: {
      type: Sequelize.TEXT,
      primaryKey: true,
      allowNull: false
    },
    identityType: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = users;