'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Each personal details belongs to one user
      PersonalDetails.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  PersonalDetails.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      degree: DataTypes.STRING,
      institution: DataTypes.STRING,
      graduationYear: DataTypes.INTEGER,
      resume: DataTypes.STRING,
      coverLetter: DataTypes.STRING,
      portfolioLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PersonalDetails',
    }
  );
  return PersonalDetails;
};
