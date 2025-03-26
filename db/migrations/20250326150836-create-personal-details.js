'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PersonalDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Ensure 'Users' table exists
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      degree: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      institution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      graduationYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coverLetter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      portfolioLink: {
        type: Sequelize.STRING,
        allowNull: true, // It's optional
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), // Fix default value
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'), // Fix default value
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PersonalDetails');
  },
};
