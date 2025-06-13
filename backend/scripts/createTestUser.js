const bcrypt = require('bcrypt');
const { User, sequelize } = require('../models');

async function createTestUser() {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    const hashedPassword = await bcrypt.hash('testpassword', 10);

    const [user, created] = await User.findOrCreate({
      where: { email: 'testuser@example.com' },
      defaults: {
        email: 'testuser@example.com',
        passwordHash: hashedPassword,
        firstName: 'Test',
        lastName: 'User'
      }
    });

    if (created) {
      console.log('Test user created successfully.');
    } else {
      console.log('Test user already exists.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
}

createTestUser();
