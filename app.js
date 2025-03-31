require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const authRouter = require('./route/authRoute');
const personalDetailsRoutes = require('./route/personalDetailsRoute');
const companyRoutes = require('./route/companyRoutes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // if you need cookies/auth
  })
);

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working',
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api', personalDetailsRoutes);
app.use('/api', companyRoutes);
// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  });
});

// Error Handler (add this after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
});

const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
