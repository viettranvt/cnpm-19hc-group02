const createError = require('http-errors');
const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const HttpStatus = require('http-status-codes');
const fs = require('fs');
const db = require('./database/db');
const { PostgresConnection } =require('./utils/secrets');
const PermissionDumpData = require('./dump-data/permissions.dump-data');
const ServicesDumpData = require('./dump-data/services.dump-data');
const RoomTypesDumpData = require('./dump-data/rooms-types.dump-data');
const RoomsDumpData = require('./dump-data/rooms.dump-data');
const StaffDumpData = require('./dump-data/staffs.dump-data');
const FoodsDumpData = require('./dump-data/foods.dump-data');

// create logs folder
if (!fs.existsSync('./logs')) {
  fs.mkdirSync('./logs');
}
// config log4js
const log4js = require('log4js');
log4js.configure('./config/log4js.json');
const loggerApp = log4js.getLogger('app');

const app = express();
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  callback(null, corsOptions) // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', require('./routes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const msg = err.message ? err.message : JSON.stringify(err);

  loggerApp.error('APP::error ', JSON.stringify(err));

  return res
    .status(HttpStatus.BAD_REQUEST)
    .json({
      message: msg
    });
});

const onListening = () => {
  loggerApp.info('APP::Server is running on port ', port);
}

const port = process.env.PORT || 3500;
app.set('port', port);

const server = http.createServer(app);
server.on('listening', onListening);

db(() => {
  loggerApp.info('APP::Database connection successful');
  PostgresConnection.sync({ force: false }).then(async () => {
    require('./models/index.model');
    await PermissionDumpData();
    await ServicesDumpData();
    await RoomTypesDumpData();
    await RoomsDumpData();
    await StaffDumpData();
    await FoodsDumpData();
    server.listen(port);
  });
});
