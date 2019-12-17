'use strict';

const Questionnaire = require("../models/questionnaire");

module.exports = {

    // Prints questionnaire collections
    list(request, response) {
        Questionnaire.find().sort('title').select('title').exec((err, questionnaires) => {
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

    create(request, response) {},
    processCreate(request, response) {},
    update(request, response) {},
    processUpdate(request, response) {},
    delete(request, response) {},
    processDelete(request, response) {}
};
