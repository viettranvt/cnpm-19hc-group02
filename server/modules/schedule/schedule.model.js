const Sequelize = require('sequelize');
const { PostgresConnection } = require('../../utils/secrets');

const schedule = PostgresConnection.define(
  'schedules',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    creatorId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    timestamps: true,
    paranoid: true,
  }
);
module.exports = schedule;