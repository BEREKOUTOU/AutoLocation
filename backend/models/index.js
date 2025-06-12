const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Location = require('./location')(sequelize, Sequelize);
db.VehicleCategory = require('./vehicleCategory')(sequelize, Sequelize);
db.Vehicle = require('./vehicle')(sequelize, Sequelize);
db.Reservation = require('./reservation')(sequelize, Sequelize);
db.Testimonial = require('./testimonial')(sequelize, Sequelize);

// Associations
db.Vehicle.belongsTo(db.VehicleCategory, { foreignKey: 'categoryId' });
db.Reservation.belongsTo(db.User, { foreignKey: 'userId' });
db.Reservation.belongsTo(db.Vehicle, { foreignKey: 'vehicleId' });
db.Reservation.belongsTo(db.Location, { foreignKey: 'locationId' });
db.Testimonial.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
