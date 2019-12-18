'use strict';

const Questionnaire = require("../models/questionnaire");

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

    updateQuestionnaire(request, response) {
        Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
            response.render('questionnaire/add_questionnaire', {
                new: false,
                questionnaire: questionnaire,
                csrfToken: request.csrfToken()
            });
        });
    },

    processUpdateQuestionnaire(request, response) {
        const {error} = Questionnaire.validateQuestionnaire(request.body);
        if (!error) {
            Questionnaire.findById(request.params.id).exec((err, questionnaire) => {
                questionnaire.title = request.body.title;
                questionnaire.submissions = request.body.submissions;
                questionnaire.save();
                response.redirect('/questionnaires');
            });
        } else {
            return response.render('questionnaire/add_questionnaire', {
                errors: error
            });
        }
    },

    delete(request, response) {},
    processDelete(request, response) {}
};
