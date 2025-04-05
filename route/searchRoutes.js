const express = require('express');
const router = express.Router();
const searchController = require('../controller/searchController');

router.get('/search-docs', searchController.searchDocuments);

module.exports = router;

module.exports = router;
