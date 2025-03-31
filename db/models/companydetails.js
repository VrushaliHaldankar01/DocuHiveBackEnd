'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CompanyDetails extends Model {
    static associate(models) {
      // Associate with User model if needed
      // this.belongsTo(models.User, { foreignKey: 'userId' });
      // Uncomment and use this if you have a User model
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user', // optional: gives you a nice name for the association
      });
    }
  }

  CompanyDetails.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id', // Maps to snake_case in database
        references: {
          model: 'users', // Must match your users table name exactly
          key: 'id',
        },
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      employmentPeriod: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\d{4}-\d{4}$/,
        },
      },
      salary: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      // Document paths (Multer will store the files)
      payslips: {
        type: DataTypes.JSON, // Array of file paths
        defaultValue: [],
      },
      appointmentLetter: {
        type: DataTypes.STRING, // Single file path
      },
      incrementLetter: {
        type: DataTypes.STRING,
      },
      promotionLetter: {
        type: DataTypes.STRING,
      },
      recognitionAwards: {
        type: DataTypes.JSON, // Array of file paths
        defaultValue: [],
      },
      exitDocuments: {
        type: DataTypes.JSON, // Array of file paths
        defaultValue: [],
      },
      // Additional metadata
      documentsDirectory: {
        type: DataTypes.STRING, // Custom directory for this record's documents
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'CompanyDetails',
      tableName: 'company_details',
      timestamps: true,
      paranoid: false,
      underscored: true,
    }
  );

  return CompanyDetails;
};
