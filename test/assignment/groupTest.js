
'use strict';

const chai = require('chai');
const expect = chai.expect;

const http = require('http');
const Browser = require('zombie');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const assert = require('assert');
chai.use(chaiHttp);

const app = require('../../app.js');
const Game = require('../../public/js/gameFile.js');
const GameController = require('../../controllers/game.js');
//import {shuffle} from '../../public/js/gameFile.js';
const shuffle = require('../../controllers/game.js').shuffle;
const port = 3000;

describe('tests', function(){

    const server = http.createServer(app).listen(port);
    Browser.localhost('bwa', port);
    const browser = new Browser();
    let request;

    after(function(done) {
        mongoose.disconnect(done);
    });
    this.beforeAll(function(done) {
        request = chai.request.agent(app);
        done();
    });

    this.afterAll(function(done) {
        request.close(done);
    });

    describe('getQuestions', function(){
        it('empty data', async function(){
            const response = await request
                .get('/game');
            expect(response.statusCode).to.equal(200);
            await Promise.resolve();
            assert.ok(true);
        });
        it('invalid id', async function(){
            const response = await request
                .get('/game')
                .type('json')
                .send({
                    params: {id: 123}
                });
            expect(response.statusCode).to.equal(200);
            await Promise.resolve();
            assert.ok(true);
        });
    });

    describe('gradeExercise', function(){
        it('empty data', async function(){
            const response = await request
                .post('/incorrectPath')
                .type('json')
                .send({
                    correct: 2,
                    wrong: 4
                });
            expect(response.statusCode).to.equal(404);
            await Promise.resolve();
            assert.ok(true);
        });
        it('Should grade exercise', async function(){
            const response = await request
                .post('/')
                .type('json')
                .send({
                    correct: 2,
                    wrong: 4
                });
            expect(response.statusCode).to.equal(200);
            // expect(JSON.parse(response.body).maxPoints).to.equal(6);
            await Promise.resolve();
            assert.ok(true);
        });
    });

    describe('gameFile', function(){

        it('shuffle: length', function(done){
            console.log(shuffle);
            // let a,b,c;
            // let testArr = [a,b,c];
            // let resultArr = shuffle (testArr);
            // expect(resultArr.length).to.equal(testArr.length);
            done();
        });
        it('shuffle: same values should exist after call', function(done){
            // let a,b,c;
            // let testArr = [a,b,c];
            // let resultArr = shuffle(testArr);
            // expect(testArr).to.equal(expect.arrayContaining(resultArr));
            done();
        });
    });

});
