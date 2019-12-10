'use strict';

// load routers
const UsersRouter = require('./routes/users');
const HelloRouter = require('./routes/hello');
const GameRouter = require('./routes/game');

// Setup Routes
module.exports = function(app) {
    app.use('/users', UsersRouter);
    app.use('/game', GameRouter);
    app.use('/', HelloRouter);
};
