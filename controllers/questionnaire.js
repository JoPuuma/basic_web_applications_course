'use strict';

const Questionnaire = require("../models/questionnaire");

module.exports = {

    // Prints questionnaire collections
    list(request, response) {
        Questionnaire.find().sort('title').select('title').exec((err, questionnaires) => {
            response.render('questionnaire/questionnaires', {questionnaires});
        });
    },

    show(request, response) {},
    create(request, response) {},
    processCreate(request, response) {},
    update(request, response) {},
    processUpdate(request, response) {},
    delete(request, response) {},
    processDelete(request, response) {}
};
