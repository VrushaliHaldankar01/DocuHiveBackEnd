'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('company_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Must match your users table name exactly
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      job_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employment_period: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      payslips: {
        type: Sequelize.JSONB,
        defaultValue: [],
      },
      appointment_letter: {
        type: Sequelize.STRING,
      },
      increment_letter: {
        type: Sequelize.STRING,
      },
      promotion_letter: {
        type: Sequelize.STRING,
      },
      recognition_awards: {
        type: Sequelize.JSONB,
        defaultValue: [],
      },
      exit_documents: {
        type: Sequelize.JSONB,
        defaultValue: [],
      },
      documents_directory: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('company_details');
  },
};
