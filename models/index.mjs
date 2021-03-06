import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import initRouteModel from './route.mjs';
import initTripModel from './trip.mjs';
import initUserModel from './user.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};
let sequelize;
//
if (env === 'production') {
  console.log('production block in index.mjs');
  // Break apart the Heroku database url and rebuild the configs we need
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(
    dbUrl.auth.indexOf(':') + 1,
    dbUrl.auth.length,
  );
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  sequelize = new Sequelize(dbName, username, password, config);
} else {
  console.log('i m not suppose to run index.mjs. local db else statement');
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}
//

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Route = initRouteModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);

db.Route.belongsTo(db.Trip);
db.Trip.hasMany(db.Route);
db.Trip.belongsTo(db.User);
db.User.hasMany(db.Trip);

// add your model definitions to db here
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
