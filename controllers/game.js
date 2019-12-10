'use strict';

const Game = require('../models/hello');  // TODO: Change model to game model

module.exports = {
    getQuestions(request, response) {
        // TODO: Use model
        const data = require('../setup/game.questionnaire');
        response.json(data[1]);
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
