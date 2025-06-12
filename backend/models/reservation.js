module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'vehicle_id',
      references: {
        model: 'vehicles',
        key: 'id'
      }
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'location_id',
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    pickupDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'pickup_date'
    },
    pickupTime: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'pickup_time'
    },
    dropoffDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'dropoff_date'
    },
    dropoffTime: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'dropoff_time'
    }
  }, {
    tableName: 'reservations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Reservation;
};
