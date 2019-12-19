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
        let questionnaire = new Questionnaire;
        // Add empty question for a new question form
        questionnaire.questions.push({options:Array(3).fill(null)});
        response.render('questionnaire/edit_questionnaire', {
            questionnaire: questionnaire,
            csrfToken: request.csrfToken()
        });
    },

    processCreate(request, response) {
        // Set correctness values
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
        let questionnaire = new Questionnaire;
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
                questionnaire: questionnaire,
                csrfToken: request.csrfToken(),
                errors: error
            });
        }
    },
    update(request, response) {
        Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
            // Add empty question for a new question form
            questionnaire.questions.push({options:Array(3).fill(null)});
            response.render('questionnaire/edit_questionnaire', {
                questionnaire: questionnaire,
                csrfToken: request.csrfToken()
            });
        });
    },

    processUpdate(request, response) {
        // Set correctness values
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
                    questionnaire: questionnaire,
                    csrfToken: request.csrfToken(),
                    errors: error
                });
            }
        });
    },

    delete(request, response) {
        Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
            response.render('questionnaire/delete', {
                title: questionnaire.title,
                csrfToken: request.csrfToken()
            });
        });
    },

    processDelete(request, response) {
        Questionnaire.findByIdAndDelete(request.params.id).exec((err, questionnaire) => {
            response.redirect('/questionnaires');
        });
    },

    deleteQuestion(request, response) {
        Questionnaire.findById(request.params.id_questionnaire).exec((err, questionnaire) => {
            let title;
            for (const question of questionnaire.questions) {
                if (question.id === request.params.id_question) {
                    title = question.title;
                }
            }
            if (questionnaire.questions.length > 1) {
                response.render('questionnaire/delete', {
                    title: title,
                    csrfToken: request.csrfToken()
                });
            } else {
                const error = ['Questionnaire must contain at least one question.'];
                questionnaire.questions.push({options:Array(3).fill(null)});
                response.render('questionnaire/edit_questionnaire', {
                    questionnaire: questionnaire,
                    csrfToken: request.csrfToken(),
                    error: error
                });
            }
        });
    },

    processDeleteQuestion(request, response) {
        Questionnaire.findById(request.params.id_questionnaire).exec((err, questionnaire) => {
            if (questionnaire.questions.length > 1) {
                for (let i = 0; i < questionnaire.questions.length; i++) {
                    if (questionnaire.questions[i].id === request.params.id_question) {
                        questionnaire.questions.splice(i,1);
                        questionnaire.save();
                        break;
                    }
                }
            }
            response.redirect('/questionnaires');
        });
    }
};
