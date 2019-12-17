'use strict';

const express = require('express');
const router = express.Router();
const GameController = require('../controllers/game');

router.use(auth.ensureStudent);

router.get('/');

router.get('/data/:id', GameController.getQuestions);
router.get('/:id', GameController.showExercise);
router.post('/:id', GameController.gradeExercise);

module.exports = router;
