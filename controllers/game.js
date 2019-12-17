'use strict';

const Game = require('../models/hello');  // TODO: Change model to game model
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
        const maxPoints = 2;
        const points = Game.grade(request.body.answer, maxPoints);
        response.render('hello-graded', {
            points: points,
            maxPoints: maxPoints,
            status: 'graded',
            description: 'minimal viable grader in the express framework',
            title: 'A+ greetings'
        });
    }
};
