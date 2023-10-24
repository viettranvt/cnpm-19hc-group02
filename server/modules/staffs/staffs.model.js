const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const staffs = PostgresConnection.define(
  'staffs',
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
    userName: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    phoneNumber:{
      type: Sequelize.TEXT,
      allowNull: false
    },
    permissionId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  { timestamps: true, paranoid: true }
);
module.exports = staffs;