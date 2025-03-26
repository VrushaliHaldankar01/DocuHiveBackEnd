const router = require('express').Router();
const upload = require('../middlewares/upload');
const {
  createPersonalDetails,
} = require('../controller/personalDetailController');

router.route('/personal-details').post(
  upload.fields([
    {
      name: 'resume',
      maxCount: 1,
    },
    { name: 'coverLetter', maxCount: 1 },
  ]),
  createPersonalDetails
);

module.exports = router;
