const { Sequelize } = require('sequelize'); // Import Sequelize class

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

// Initialize Sequelize with the database configuration
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
  }
);

module.exports = sequelize; // Export the sequelize instance for use in other parts of the app
