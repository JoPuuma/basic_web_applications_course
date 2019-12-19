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

// Update a questionnaire
router.get('/edit/:id([a-f0-9]{24})', QuestionnaireController.update);
router.post('/edit/:id([a-f0-9]{24})', QuestionnaireController.processUpdate);

// Delete a questionnaire
router.get('/delete/:id([a-f0-9]{24})', QuestionnaireController.delete);
router.post('/delete/:id([a-f0-9]{24})', QuestionnaireController.processDelete);

// Delete a question
router.get('/delete/:id_questionnaire([a-f0-9]{24})/:id_question([a-f0-9]{24})', QuestionnaireController.deleteQuestion);
router.post('/delete/:id_questionnaire([a-f0-9]{24})/:id_question([a-f0-9]{24})', QuestionnaireController.processDeleteQuestion);

module.exports = router;
