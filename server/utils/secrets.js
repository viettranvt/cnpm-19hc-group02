const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const Url = process.env.DATABASE_URL || "postgres://hdjlmpgy:iyHqi4RaLH9bo4Zb-O8nrs7Vm7qQZuzZ@satao.db.elephantsql.com:5432/hdjlmpgy";

console.log(Url);

module.exports = {
  PostgresConnection: new Sequelize(Url),
  JWTSecretKey: 'CNPM19CH02'
}