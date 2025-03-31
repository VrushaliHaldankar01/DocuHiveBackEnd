const router = require('express').Router();
const companyController = require('../controller/companyController');
const companyUpload = require('../middlewares/companyMiddleware');

router.route('/company-details').post(
  companyUpload.fields([
    { name: 'payslips', maxCount: 10 },
    { name: 'appointmentLetter', maxCount: 1 },
    { name: 'incrementLetter', maxCount: 1 },
    { name: 'promotionLetter', maxCount: 1 },
    { name: 'recognitionAwards', maxCount: 5 },
    { name: 'exitDocuments', maxCount: 5 },
  ]),
  companyController.createCompanyDetails
);

module.exports = router;
