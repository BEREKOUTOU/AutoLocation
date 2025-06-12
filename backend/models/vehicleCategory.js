module.exports = (sequelize, DataTypes) => {
  const VehicleCategory = sequelize.define('VehicleCategory', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'vehicle_categories',
    timestamps: false
  });

  return VehicleCategory;
};
