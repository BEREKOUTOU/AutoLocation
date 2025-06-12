module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    model: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id',
      references: {
        model: 'vehicle_categories',
        key: 'id'
      }
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'image_url'
    },
    pricePerDay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'price_per_day'
    },
    transmission: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fuelType: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'fuel_type'
    }
  }, {
    tableName: 'vehicles',
    timestamps: false
  });

  return Vehicle;
};
