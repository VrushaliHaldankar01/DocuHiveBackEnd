'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('CompanyDetails', 'payslips', {
      type: Sequelize.JSON,
      defaultValue: [],
    });

    await queryInterface.addColumn('CompanyDetails', 'appointmentLetter', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('CompanyDetails', 'incrementLetter', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('CompanyDetails', 'promotionLetter', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('CompanyDetails', 'recognitionAwards', {
      type: Sequelize.JSON,
      defaultValue: [],
    });

    await queryInterface.addColumn('CompanyDetails', 'exitDocuments', {
      type: Sequelize.JSON,
      defaultValue: [],
    });

    await queryInterface.addColumn('CompanyDetails', 'documentsDirectory', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('CompanyDetails', 'payslips');
    await queryInterface.removeColumn('CompanyDetails', 'appointmentLetter');
    await queryInterface.removeColumn('CompanyDetails', 'incrementLetter');
    await queryInterface.removeColumn('CompanyDetails', 'promotionLetter');
    await queryInterface.removeColumn('CompanyDetails', 'recognitionAwards');
    await queryInterface.removeColumn('CompanyDetails', 'exitDocuments');
    await queryInterface.removeColumn('CompanyDetails', 'documentsDirectory');
  },
};
