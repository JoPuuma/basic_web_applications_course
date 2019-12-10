'use strict';

const express = require('express');
const router = express.Router();
const GameController = require('../controllers/game');

router.get('/data/game', GameController.getQuestions);

router.get('/', GameController.showExercise);
router.post('/', GameController.gradeExercise);

module.exports = router;
