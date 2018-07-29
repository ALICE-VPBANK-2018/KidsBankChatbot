const express = require('express');
const router = express.Router();

// Require controllers module
const documentController = require('../controllers/documentController');

router.get('/', documentController.getAll);
router.get('/id=:id', documentController.findById);
router.get('/offset=:offset/limit=:limit', documentController.pagenition);
router.post('/', documentController.create);

module.exports = router;
