const { PersonalDetails } = require('../db/models');
const fs = require('fs');
const path = require('path');

exports.createPersonalDetails = async (req, res) => {
  try {
    // Extract text fields from request body
    const { userId, degree, institution, graduationYear, portfolioLink } =
      req.body;

    // Validate required fields
    if (
      !userId ||
      !degree ||
      !institution ||
      !graduationYear ||
      !portfolioLink
    ) {
      return res.status(400).json({ error: 'All text fields are required' });
    }

    if (!req.files || (!req.files['resume'] && !req.files['coverLetter'])) {
      return res.status(400).json({
        error: 'At least one file (resume or cover letter) is required',
      });
    }

    // Check if record exists for this user
    const existingDetails = await PersonalDetails.findOne({
      where: { userId },
    });

    // Process files
    const fileData = {};

    // Handle resume file
    if (req.files['resume']) {
      fileData.resume = req.files['resume'][0].path;
      // Delete old resume file if updating
      if (existingDetails?.resume && fs.existsSync(existingDetails.resume)) {
        fs.unlinkSync(existingDetails.resume);
      }
    }

    // Handle cover letter file
    if (req.files['coverLetter']) {
      fileData.coverLetter = req.files['coverLetter'][0].path;
      // Delete old cover letter if updating
      if (
        existingDetails?.coverLetter &&
        fs.existsSync(existingDetails.coverLetter)
      ) {
        fs.unlinkSync(existingDetails.coverLetter);
      }
    }

    let personalDetails;
    let action;

    if (existingDetails) {
      // Update existing record
      personalDetails = await existingDetails.update({
        degree,
        institution,
        graduationYear,
        portfolioLink,
        ...fileData,
      });
      action = 'updated';
    } else {
      // Create new record
      personalDetails = await PersonalDetails.create({
        userId,
        degree,
        institution,
        graduationYear,
        portfolioLink,
        ...fileData,
      });
      action = 'created';
    }

    res.status(200).json({
      message: `Personal details ${action} successfully`,
      data: personalDetails,
      action,
    });
  } catch (error) {
    console.error('Error processing personal details:', error);

    // Cleanup uploaded files if error occurred
    if (req.files) {
      Object.values(req.files)
        .flat()
        .forEach((file) => {
          if (file.path && fs.existsSync(file.path)) {
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

// get perosnalDetail

exports.getPersonalDetails = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required',
        details: 'Please provide a valid user ID in the URL',
      });
    }

    // query the databse for personal details

    const personalDetail = await PersonalDetails.findOne({
      where: { userId },
      attributes: [
        'id',
        'userId',
        'degree',
        'institution',
        'graduationYear',
        'portfolioLink',
        'resume', // File path
        'coverLetter', // File path
        'createdAt',
        'updatedAt',
      ],
    });

    if (!personalDetail) {
      return res.status(400).json({
        message: 'Personal Details not found',
        suggestion: 'creater personal detail first',
      });
    }

    res.status(200).json({
      success: true,
      data: personalDetail,
    });
  } catch (error) {
    // 6. Handle errors
    console.error('Error fetching personal details:', error);

    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
};
