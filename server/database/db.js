const log4js = require('log4js');
const logger = log4js.getLogger('app');
const { PostgresConnection } = require('../utils/secrets');

module.exports = (cb) => {
  PostgresConnection.authenticate()
  .then(() => {
    // dumpUser.run();
    return cb();
  })
  .catch((err) => {
    logger.error("app::Connection DB::Can't connection DB");
    throw new Error(err);
  });
};
