const { CompanyDetails } = require('../db/models');
const fs = require('fs');
const path = require('path');
exports.createCompanyDetails = async (req, res) => {
  try {
    const { companyName, jobTitle, employmentPeriod, salary, userId } =
      req.body;

    if (!companyName || !jobTitle || !employmentPeriod || !salary || !userId) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: [
          'companyName',
          'jobTitle',
          'employmentPeriod',
          'salary',
          'userId',
        ],
      });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }

    // Process files
    const fileData = {};

    // Single files
    if (req.files.appointmentLetter) {
      fileData.appointmentLetter = req.files.appointmentLetter[0].path;
    }
    if (req.files.incrementLetter) {
      fileData.incrementLetter = req.files.incrementLetter[0].path;
    }

    // Multiple files
    if (req.files.payslips) {
      fileData.payslips = req.files.payslips.map((file) => ({
        path: file.path,
        originalName: file.originalname,
        uploadedAt: new Date(),
      }));
    }

    // Create record
    const companyDetails = await CompanyDetails.create({
      userId,
      companyName,
      jobTitle,
      employmentPeriod,
      salary,
      ...fileData,
      documentsDirectory: 'uploads/company_documents/',
    });

    res.status(201).json({
      message: 'Company details created successfully', // Fixed typo "messsage"
      data: companyDetails,
    });
  } catch (error) {
    console.error('Error creating company details:', error);

    // Cleanup files
    if (req.files) {
      Object.values(req.files)
        .flat()
        .forEach((file) => {
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
};
