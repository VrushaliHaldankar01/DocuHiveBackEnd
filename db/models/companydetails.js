'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CompanyDetails extends Model {
    static associate(models) {
      // Define associations later (e.g., belongsTo User)
    }
  }

  CompanyDetails.init(
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false, // Required field
        validate: {
          notEmpty: true, // Must not be empty string
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
          is: /^\d{4}-\d{4}$/, // Validate format (e.g., "2020-2023")
        },
      },
      salary: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0, // Prevent negative salaries
        },
      },
    },
    {
      sequelize,
      modelName: 'CompanyDetails',
      tableName: 'company_details', // Explicit snake_case table name
      timestamps: true, // Enable createdAt/updatedAt
      paranoid: false, // Disable soft-delete (set true if needed)
      underscored: true, // Auto-convert camelCase to snake_case
    }
  );

  return CompanyDetails;
};
