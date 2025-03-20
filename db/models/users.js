'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

class User extends Model {
  // ✅ Define any custom methods or associations here
  static associate(models) {
    // Example association:
    // User.hasMany(models.Post, { foreignKey: 'userId' });
  }
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM('0', '1'),
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // ✅ Fixed typo and used BOOLEAN value
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE, // ✅ Fixed the typo from deletedAT → deletedAt
    },
  },
  {
    sequelize, // ✅ Pass the sequelize instance
    modelName: 'User', // ✅ Capitalized the model name to follow convention
    paranoid: true, // ✅ Enables soft delete
    freezeTableName: true, // ✅ Keeps table name as 'Users' (no plural)
    tableName: 'Users', // ✅ Explicitly set the table name to 'Users' (case-sensitive)
  }
);

module.exports = User;
