'use strict';

// load routers
const UsersRouter = require('./routes/users');
const HelloRouter = require('./routes/hello');
const GameRouter = require('./routes/game');
const QuestionnaireRouter = require('./routes/questionnaire');

// Setup Routes
module.exports = function(app) {
    app.use('/users', UsersRouter);
    app.use('/game', GameRouter);
    app.use('/questionnaires', QuestionnaireRouter);
    app.use('/', HelloRouter);
};
