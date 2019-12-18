'use strict';

const Questionnaire = require("../models/questionnaire");

module.exports = {

    /**
     * Returns questions as JSON
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    getQuestions(request, response) {

        Questionnaire.findById(request.params.id, (err, data) => {
            if (data) {
                response.json(data.toJSON());
            } else {
                response.sendStatus(404);
            }
        });
    },

    /**
     * Prints exercise page
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */
    showExercise(request, response) {
        // currently we use only the default exercise here
        response.render('game');
    },

    /**
     * gradeExercise returns a grade for answer
     * @param {Object} request is express request object
     * @param {Object} response is express response object
     */

    gradeExercise(request, response) {
        const correctPoints = parseInt(request.body.correct);
        const wrongPoints = parseInt(request.body.wrong);
        response.render('game-graded', {
            points: correctPoints,
            maxPoints: correctPoints + wrongPoints,
            status: 'graded',
            description: 'minimal viable grader in the express framework',
            title: 'A+ greetings'
        });
    }
};
