const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const baseDir = 'uploads/company_documents/';
    const subDirs = {
      payslips: 'payslips/',
      appointmentLetter: 'appointment_letters/',
      incrementLetter: 'increment_letters/',
      promotionLetter: 'promotion_letters/',
      recognitionAwards: 'awards/',
      exitDocuments: 'exit_docs/',
    };

    const dir = baseDir + (subDirs[file.fieldname] || 'others/');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); // This was missing
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF/JPEG/PNG allowed for company documents!'), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
