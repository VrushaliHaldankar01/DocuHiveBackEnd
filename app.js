require('dotenv').config();
const express = require('express');
const app = express();
const authRouter = require('./route/authRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Api are working ',
  });
});

// all routes
app.use('/api/v1/auth', authRouter);

const PORT = process.env.APP_PORT || 4000;

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'not success',
    message: 'route not found',
  });
});
app.listen(PORT, () => {
  console.log('server is running on port ', PORT);
});
