const { PersonalDetails, CompanyDetails } = require('../db/models');
const path = require('path');

exports.searchDocuments = async (req, res) => {
  try {
    const { userId, searchTerm = '' } = req.query;

    // Basic validation
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Search both collections in parallel
    const [personalResults, companyResults] = await Promise.all([
      PersonalDetails.findAll({
        where: { userId },
        attributes: ['id', 'resume', 'coverLetter', 'degree', 'institution'],
      }),
      CompanyDetails.findAll({
        where: { userId },
        attributes: [
          'id',
          'companyName',
          'jobTitle',
          'payslips',
          'appointmentLetter',
          'incrementLetter',
          'promotionLetter',
        ],
      }),
    ]);

    // Format results
    const response = {
      personal: formatPersonalResults(personalResults, searchTerm),
      company: formatCompanyResults(companyResults, searchTerm),
    };

    res.json(response);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Formatting helpers
function formatPersonalResults(details, searchTerm) {
  return details.map((detail) => ({
    id: detail.id,
    type: 'personal',
    documents: [
      { name: 'Resume', path: detail.resume },
      { name: 'Cover Letter', path: detail.coverLetter },
    ].filter((doc) => doc.path && matchesSearch(doc.path, searchTerm)),
    metadata: {
      degree: detail.degree,
      institution: detail.institution,
    },
  }));
}

function formatCompanyResults(details, searchTerm) {
  return details.map((detail) => ({
    id: detail.id,
    type: 'company',
    companyName: detail.companyName,
    jobTitle: detail.jobTitle,
    documents: [
      { name: 'Payslips', path: detail.payslips?.map((p) => p.path) },
      { name: 'Appointment Letter', path: detail.appointmentLetter },
      { name: 'Increment Letter', path: detail.incrementLetter },
      { name: 'Promotion Letter', path: detail.promotionLetter },
    ].filter(
      (doc) =>
        doc.path &&
        (Array.isArray(doc.path)
          ? doc.path.some((p) => matchesSearch(p, searchTerm))
          : matchesSearch(doc.path, searchTerm))
    ),
  }));
}

function matchesSearch(filePath, term) {
  if (!term) return true;
  return path.basename(filePath).toLowerCase().includes(term.toLowerCase());
}
