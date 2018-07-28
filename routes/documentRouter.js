const express = require('express');
const router = express.Router();

// Require controllers module
const documentController = require('../controllers/documentController');

router.get('/getAll', documentController.getAll);

module.exports = router;
