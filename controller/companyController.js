const { CompanyDetails } = require('../db/models');
const fs = require('fs');
const path = require('path');
exports.createCompanyDetails = async (req, res) => {
  try {
    const { companyName, jobTitle, employmentPeriod, salary, userId } =
      req.body;

    // Validate required fields
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

    // Check if record exists for this user
    const existingDetails = await CompanyDetails.findOne({
      where: { userId },
    });

    // Handle file uploads (same as before)
    if (req.files.appointmentLetter) {
      fileData.appointmentLetter = req.files.appointmentLetter[0].path;
      // Delete old file if updating
      if (existingDetails?.appointmentLetter) {
        fs.unlinkSync(existingDetails.appointmentLetter);
      }
    }
    if (req.files.incrementLetter) {
      fileData.incrementLetter = req.files.incrementLetter[0].path;
      if (existingDetails?.incrementLetter) {
        fs.unlinkSync(existingDetails.incrementLetter);
      }
    }
    if (req.files.promotionLetter) {
      fileData.promotionLetter = req.files.promotionLetter[0].path;
      if (existingDetails?.promotionLetter) {
        fs.unlinkSync(existingDetails.promotionLetter);
      }
    }

    // Handle multiple file uploads
    if (req.files.payslips) {
      fileData.payslips = req.files.payslips.map((file) => ({
        path: file.path,
        originalName: file.originalname,
        uploadedAt: new Date(),
      }));
      // Delete old payslips if updating
      if (existingDetails?.payslips) {
        existingDetails.payslips.forEach((payslip) => {
          if (fs.existsSync(payslip.path)) fs.unlinkSync(payslip.path);
        });
      }
    }
    if (req.files.recognitionAwards) {
      fileData.recognitionAwards = req.files.recognitionAwards.map((file) => ({
        path: file.path,
        originalName: file.originalname,
        uploadedAt: new Date(),
      }));
      if (existingDetails?.recognitionAwards) {
        existingDetails.recognitionAwards.forEach((award) => {
          if (fs.existsSync(award.path)) fs.unlinkSync(award.path);
        });
      }
    }
    if (req.files.exitDocuments) {
      fileData.exitDocuments = req.files.exitDocuments.map((file) => ({
        path: file.path,
        originalName: file.originalname,
        uploadedAt: new Date(),
      }));
      if (existingDetails?.exitDocuments) {
        existingDetails.exitDocuments.forEach((doc) => {
          if (fs.existsSync(doc.path)) fs.unlinkSync(doc.path);
        });
      }
    }

    let companyDetails;
    let action;

    if (existingDetails) {
      // Update existing record
      companyDetails = await existingDetails.update({
        companyName,
        jobTitle,
        employmentPeriod,
        salary,
        ...fileData,
        documentsDirectory: 'uploads/company_documents/',
      });
      action = 'updated';
    } else {
      // Create new record
      companyDetails = await CompanyDetails.create({
        userId,
        companyName,
        jobTitle,
        employmentPeriod,
        salary,
        ...fileData,
        documentsDirectory: 'uploads/company_documents/',
      });
      action = 'created';
    }

    res.status(200).json({
      message: `Company details ${action} successfully`,
      data: companyDetails,
      action,
    });
  } catch (error) {
    console.error('Error processing company details:', error);

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
