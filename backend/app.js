require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

const whitelist = ['http://localhost:3000', 'http://localhost:5174', 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const usersRouter = require('./routes/users');
const locationsRouter = require('./routes/locations');
const vehicleCategoriesRouter = require('./routes/vehicleCategories');
const vehiclesRouter = require('./routes/vehicles');
const reservationsRouter = require('./routes/reservations');
const testimonialsRouter = require('./routes/testimonials');
const authRouter = require('./routes/auth');

// Use routes
app.use('/api/users', usersRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/vehicle-categories', vehicleCategoriesRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/auth', authRouter);

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
