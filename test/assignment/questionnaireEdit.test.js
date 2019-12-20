'use strict';

const http = require('http');
const Browser = require('zombie');
// const assert = require('assert');
const app = require('../../app.js');
const chai = require('chai');
const expect = chai.expect;
//const registerUrl = '/users/register';
const User = require('../../models/user');

const port = 3333;

require('dotenv').config();

const testUser = {
    name: 'Metkunen',
    email: 'new@user.fi',
    password: '1234567890',
    role: 'teacher'
};
const options = {
  opt1: {value: '1', correctness: true},
  opt2: {value: '2', correctness: false},
  opt3: {value: '3', correctness: false}
};
const testData = {
  title: 'someTitle',
  submissions: 1,
  question: 'someQuestion',
  maxPoints: 1,
  options: {...options}
};

// describe('Editing questionnaires', function() {
//
//     let server;
//     let browser;
//
//     this.beforeAll(async function() {
//         server = http.createServer(app).listen(port);
//         Browser.localhost('bwa', port);
//         browser = new Browser();
//
//         await browser.visit('/users/register');
//         browser.fill('name', testUser.name);
//         browser.fill('email', testUser.email);
//         browser.fill('password', testUser.password);
//         browser.fill('passwordConfirmation', testUser.password);
//
//         await browser.pressButton('#btnRegister');
//     });
//
//     this.beforeEach(async function(){
//         await browser.visit('/users/login');
//         await browser.fill('email', testUser.email);
//         await browser.fill('password', testUser.password);
//         await browser.pressButton('#btnLogin');
//     })
//     this.afterAll(async function() {
//         await User.deleteOne({ email: testUser.email }, function(err) {
//             if(err) console.log(err);
//         });
//
//         server.close();
//     });
//
//     it('questionnaire adding button', async function(){
//       await browser.visit('/questionnaires/new', (err)=> err ? console.error(err) : "");
//       await browser.clickLink('#btnAddQ');
//       browser.assert.success();
//     })
//
//     it('adding questionnaire', async function(){
//       await browser.visit('/questionnaires/new', (err)=> err ? console.error(err) : "");
//       await browser.fill('title',testData.title);
//       await browser.fill('submissons',testData.submissions);
//       await browser.fill('questions[0][title]',testData.question);
//       await browser.fill('questions[0][maxPoints]',testData.maxPoints);
//
//       await browser.fill('questions[0][options][0][correctness]',options.opt1.correctness);
//       await browser.fill('questions[0][options][0][option]',options.opt1.value)
//       await browser.fill('questions[0][options][1][correctness]',options.opt2.correctness);
//       await browser.fill('questions[0][options][1][option]',options.opt2.value)
//       await browser.fill('questions[0][options][2][correctness]',options.opt3.correctness);
//       await browser.fill('questions[0][options][2][option]',options.opt3.value)
//
//       await browser.pressButton('#btnSave');
//       browser.assert.success();
//       browser.assert.url({pathname: '/something'});
//     })
// });
