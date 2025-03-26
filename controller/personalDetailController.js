const { PersonalDetails } = require('../db/models');

//create a new personal details entry

exports.createPersonalDetails = async (req, res) => {
  try {
    //extract text fields from request body

    const { userId, degree, institution, graduationYear, portfolioLink } =
      req.body;
    //Extract file Path (uploaded by Multer)
    const resumePath = req.files['resume'] ? req.files['resume'][0].path : null;
    const coverLetterPath = req.files['coverLetter']
      ? req.files['coverLetter'][0].path
      : null;

    //validate required fields

    if (
      !userId ||
      !degree ||
      !institution ||
      !graduationYear ||
      !resumePath ||
      !coverLetterPath ||
      !portfolioLink
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    //save personalDetails in the database
    const personalDetails = await PersonalDetails.create({
      userId,
      degree,
      institution,
      graduationYear,
      resume: resumePath,
      coverLetter: coverLetterPath,
      portfolioLink,
    });
    res.status(201).json({
      message: 'Personal details saved successfully',
      personalDetails,
    });
  } catch (error) {
    console.error('error saving Personal Details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
