'use strict';

const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();
const GameController = require('../controllers/game');
const QuestionnaireController = require('../controllers/questionnaire');

router.use(auth.ensureStudent);

router.get('/', QuestionnaireController.list);

router.get('/data/:id', GameController.getQuestions);
router.get('/:id', GameController.showExercise);
//router.post('/:id', GameController.gradeExercise);
router.post('/:id', GameController.gradeExercise);

module.exports = router;
