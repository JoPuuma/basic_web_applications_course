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
            const questions = questionnaire.questions;
            response.render('questionnaire/questions', {questions});
        });
    },

    create(request, response) {
        response.render('questionnaire/add_questionnaire', {
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

    update(request, response) {},
    processUpdate(request, response) {},
    delete(request, response) {},
    processDelete(request, response) {}
};
