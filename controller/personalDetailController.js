// const { PersonalDetails } = require('../db/models');

//create a new personal details entry

// exports.createPersonalDetails = async (req, res) => {
//   try {
//     //extract text fields from request body

//     const { userId, degree, institution, graduationYear, portfolioLink } =
//       req.body;
//     //Extract file Path (uploaded by Multer)
//     const resumePath = req.files['resume'] ? req.files['resume'][0].path : null;
//     const coverLetterPath = req.files['coverLetter']
//       ? req.files['coverLetter'][0].path
//       : null;

//     //validate required fields

//     if (
//       !userId ||
//       !degree ||
//       !institution ||
//       !graduationYear ||
//       !resumePath ||
//       !coverLetterPath ||
//       !portfolioLink
//     ) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }

//     //save personalDetails in the database
//     const personalDetails = await PersonalDetails.create({
//       userId,
//       degree,
//       institution,
//       graduationYear,
//       resume: resumePath,
//       coverLetter: coverLetterPath,
//       portfolioLink,
//     });
//     res.status(201).json({
//       message: 'Personal details saved successfully',
//       personalDetails,
//     });
//   } catch (error) {
//     console.error('error saving Personal Details:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

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
