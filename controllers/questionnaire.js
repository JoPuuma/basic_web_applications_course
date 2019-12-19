'use strict';

const Questionnaire = require('../models/questionnaire');

module.exports = {

    // Prints questionnaire collections
    list(request, response) {
        Questionnaire.find().sort('title').select('title questions').exec((err, questionnaires) => {
            response.render('questionnaire/questionnaires', {questionnaires});
        });
    },

    // Print questions of selected questionnaire
    show(request, response) {
        Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
            response.render('questionnaire/questions', {questionnaire});
        });
    },

    create(request, response) {
        response.render('questionnaire/add_questionnaire', {
            new: true,
            csrfToken: request.csrfToken()
        });
    },

    processCreate(request, response) {
        const {error} = Questionnaire.validateQuestionnaire(request.body);
        if (!error) {
            const new_questionnaire = new Questionnaire();
            new_questionnaire.title = request.body.title;
            new_questionnaire.submissions = request.body.submissions;
            new_questionnaire.save();
            response.redirect('/questionnaires');
        } else {
            return response.render('questionnaire/add_questionnaire', {
                errors: error
            });
        }
    },

    createQuestion(request, response) {
        Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
            response.render('questionnaire/add_question', {
                new: true,
                questionnaire: questionnaire,
                csrfToken: request.csrfToken()
            });
        });
    },

    processCreateQuestion(request, response) {
        const {error} = Questionnaire.validateQuestion(request.body);
        if (!error) {
            Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
                // questionnaire.title = request.body.title;
                // questionnaire.submissions = request.body.submissions;
                // questionnaire.save();
                response.redirect(`/questionnaires/${questionnaire.id}`);
            });
        } else {
            return response.render('questionnaire/add_question', {
                errors: error
            });
        }
    },

    update(request, response) {
        Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
            // Add empty question for a new question form
            questionnaire.questions.push({options:Array(3).fill(null)});
            console.log(questionnaire);
            console.log(questionnaire.questions.slice(-1)[0]);
            response.render('questionnaire/edit_questionnaire', {
                new: false,
                questionnaire: questionnaire,
                csrfToken: request.csrfToken()
            });
        });
    },

    processUpdate(request, response) {
        for (const question of request.body.questions) {
            for (const option of question.options) {
                if (option.correctness) {
                    option.correctness = true;
                } else {
                    option.correctness = false;
                }
            }
        }
        const {error} = Questionnaire.validateQuestionnaire(request.body);
        Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
            if (!error) {
                questionnaire.title = request.body.title;
                questionnaire.submissions = request.body.submissions;
                questionnaire.questions = request.body.questions;
                questionnaire.save();
                response.redirect('/questionnaires');
            } else {
                // Add empty question for a new question form
                questionnaire.questions.push({options:Array(3).fill(null)});
                return response.render('questionnaire/edit_questionnaire', {
                    new: false,
                    questionnaire: questionnaire,
                    csrfToken: request.csrfToken(),
                    errors: error
                });
            }
        });
    },

    delete(request, response) {},
    processDelete(request, response) {}
};
