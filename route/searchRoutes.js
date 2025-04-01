const express = require('express');
const router = express.Router();
const searchController = require('../controller/searchController');

router.get('/search-docs', searchController.searchDocuments);

module.exports = router;

// router.route('/signup').post(signup);
// router.route('/login').post(login);
// router.route('/verifyEmail').get(verifyEmail);

module.exports = router;
