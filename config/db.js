// const { Sequelize } = require('sequelize');

// const env = process.env.NODE_ENV || 'development';
// const config = require('./config')[env];
// const sequelize = new Sequelize(config);

// module.exports = sequelize;

const { Sequelize } = require('sequelize'); // Import Sequelize class

const env = process.env.NODE_ENV || 'development'; // Get the current environment (default to 'development')
const config = require('./config')[env]; // Access the configuration based on the environment

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
