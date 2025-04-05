'use strict';
const { Model } = require('sequelize');

const User = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.PersonalDetails, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
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
        defaultValue: true,
      },
      verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: false,
      freezeTableName: true,
      tableName: 'Users',
    }
  );

  return User;
};
module.exports = User;
