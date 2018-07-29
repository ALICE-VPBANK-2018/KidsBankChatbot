const express = require('express');
const router = express.Router();

// Require controllers module
const quizController = require('../controllers/quizController');

router.get('/', quizController.getAll);
router.get('/level=:level/offset=:offset/limit=:limit', quizController.getByLevel);
router.get('/random=:random', quizController.getOneRandom);
router.get('/q=:id/a=:id_answer', quizController.checkAnswer);
router.post('/', quizController.create);

module.exports = router;
