const { Vehicle, sequelize } = require('../models');

async function createTestVehicle() {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    const [vehicle, created] = await Vehicle.findOrCreate({
      where: { brand: 'TestBrand', model: 'TestModel', year: 2024 },
      defaults: {
        brand: 'TestBrand',
        model: 'TestModel',
        year: 2024,
        pricePerDay: 100.00,
        transmission: 'Automatic',
        seats: 4,
        fuelType: 'Gasoline',
      }
    });

    if (created) {
      console.log('Test vehicle created successfully:', vehicle.toJSON());
    } else {
      console.log('Test vehicle already exists:', vehicle.toJSON());
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating test vehicle:', error);
    process.exit(1);
  }
}

createTestVehicle();
