require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const usersRouter = require('./routes/users');
const locationsRouter = require('./routes/locations');
const vehicleCategoriesRouter = require('./routes/vehicleCategories');
const vehiclesRouter = require('./routes/vehicles');
const reservationsRouter = require('./routes/reservations');
const testimonialsRouter = require('./routes/testimonials');

// Use routes
app.use('/api/users', usersRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/vehicle-categories', vehicleCategoriesRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/testimonials', testimonialsRouter);

app.get('/', (req, res) => {
  res.send('Auto Location Backend API is running');
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
