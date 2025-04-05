const router = require('express').Router();
const upload = require('../middlewares/upload');
const {
  createPersonalDetails,
  getPersonalDetails,
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
router.route('/display-personal-details').get(getPersonalDetails);

module.exports = router;
