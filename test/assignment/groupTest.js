
'use strict';

const chai = require('chai');
const expect = chai.expect;

const http = require('http');
const Browser = require('zombie');

const app = require('../../app.js');
let Game = require('../../public/js/gameFile.js');
let GameController = require('../../controllers/game.js');

const port = 3000;

describe('tests',function(){

  // let server = http.createServer(app).listen(port);
  // Browser.localhost('bwa', port);
  // let browser = new Browser();
  // let request;
  //
  // this.beforeAll(function(done) {
  //     request = chai.request.agent(app);
  //     done();
  // });
  //
  // this.afterAll(function(done) {
  //     request.close(done);
  // });
  //
  // describe('getQuestions',async function(){
  //   it('empty data', function(done){
  //     const response = await request
  //         .get('/game')
  //         // return should be 404
  //     done();
  //   });
  //   it('valid data', async function(){
  //     // shouldn't be any errors
  //   })
  // });
  //
  // describe('gradeExercise',function(){
  //   it('empty data',function(done){
  //
  //     done();
  //   });
  //   it('Should grade exercise',async function(){
  //     await browser.visit()
  //   })
  // })

  describe('gameFile',function(){
    it('shuffle: length',function(done){
      let testArr = [a,b,c];
      let resultArr = Game.shuffle(testArr);
      expect(resultArr.length).to.equal(testArr.length);
      done();
    });
    it('shuffle: same values should exist',function(done){
      let testArr = [a,b,c];
      let resultArr = Game.shuffle(testArr);
      expect(testArr).toEqual(expect.arrayContaining(resultArr));
      done();
    });
  })

});
