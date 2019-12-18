'use strict';

const express = require('express');
const auth = require('../middleware/auth');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: false });

const router = express.Router();
const QuestionnaireController = require('../controllers/questionnaire');

router.use(auth.ensureTeacher);
router.use(csrfProtection);

// View documents
router.get('/', csrfProtection, QuestionnaireController.list);
router.get('/:id([a-f0-9]{24})', QuestionnaireController.show);

// Create a questionnaire
router.get('/new', QuestionnaireController.create);
router.post('/new', QuestionnaireController.processCreate);

// Create a question
router.get('/new/:id([a-f0-9]{24})', QuestionnaireController.createQuestion);
router.post('/new/:id([a-f0-9]{24})', QuestionnaireController.processCreateQuestion);

// Update a questionnaire
router.get('/edit/questionnaire/:id([a-f0-9]{24})', QuestionnaireController.updateQuestionnaire);
router.post('/edit/questionnaire/:id([a-f0-9]{24})', QuestionnaireController.processUpdateQuestionnaire);

// Delete documents
router.get('/delete/:id([a-f0-9]{24})', QuestionnaireController.delete);
router.post('/delete/:id([a-f0-9]{24})', QuestionnaireController.processDelete);

module.exports = router;
