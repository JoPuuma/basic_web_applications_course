'use strict';

loadGameData();

async function loadGameData() {
    const data_uri = `/game/data/${document.location.pathname.split('/').pop()}`;
    try {
        const response = await fetch(data_uri);
        const gameData = await handleResponse(response);
        playNextRound(gameData.questions);
    } catch (error) {
        handleError(error + " " + data_uri);
    }
}

/**
 * Play next round of game
 * @param {Array} questions array of game questions
 * @param {number} currentRound number of current game round (zero based)
 * @returns {void}
 */
function playNextRound(questions, currentRound = 0) {
    if (!Array.isArray(questions)) throw new Error('Questions is not an array');
    if (currentRound >= questions.length) throw new Error('No more questions!');
    const isLastRound = currentRound + 1 >= questions.length;
    registerEventHandlers(questions, currentRound, isLastRound);
}

/**
 * Destroy and remove door from the dom
 * @param {HTMLElement} door
 * @returns {void}
 */
function destroyDoor(door) {
    clearInterval(door.dataset.moveId);
    door.style.display = 'none';
    door.parentNode.removeChild(door);
}

function getGameStarter(question){
  const createDoor = getDoorCreator();
  let counter = 0;

  return function() {
    const intervalId = setInterval(function () {
      if(false){
        clearInterval(intervalId);
        return;
      };
      let roundDoors = [];

      for(i = 0; i < 3; i++){
        const doorData = question.options[i];
        roundDoors.push(createDoor(doorData));
      };
      dropDoors(roundDoors);
    }, 5000);
  };
}

function dropDoors(roundDoors){
  const xPos = 100;
  let yPos = 30;
  doors = shuffle(roundDoors);
  for(i = 1; i <= 3; i++){
    doors[i-1].style.left = `${xPos * i}px`;
    doors[i-1].style.left = `${yPos}px`;
  };

  moveId = setInterval(function() {
    for(i = 0; i <= 2; i++){
      doors[i].style.left = `${yPos}px`;
      doors[i].style.display = 'block';
    };
      yPos += 1;

      if (yPos > 600 || bubble.style.display === 'none') {
        for(i = 0; i <= 2; i++){
          destroyDoor(doors[i]);
        };
      }
  }, 20);

}

function getDoorCreator(){
  const doors = document.getElementById('doors');

  return function(doorData){
    const doorDiv = document.createElement('div');
    doorDiv.classList.add('door');

    doorDiv.dataset.id = doorData.option;
    //doorDiv.dataset.speech = doorData.text;

    // hidden by default
    doorDiv.style.display = 'none';
    doorDiv.innerText = doorData.text;
    doors.appendChild(doorDiv);
    return doorDiv;
  };
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * Register all event handlers for the current game round and remove old hanlers
 * @param {Array} questions all question objects in an array
 * @param {number} currentQuestion number of current question (zero based)
 * @param {boolean} submitOnGameStop whether to submit the form on game stoppage or not
 * @returns {void}
 */
function registerEventHandlers(questions, currentQuestion, submitOnGameStop = false) {
    const question = questions[currentQuestion];
    const bubbleClickHandler = getBubbleClickHandler(question, currentQuestion);

    const gameForm = document.getElementById('game-form');
    const startGame = getGameStarter(question);
    const startButton = document.getElementById('start-game');
    const submitButton = document.getElementById('grade');
    const bubbleContainer = document.getElementById('bubbles');
    const questionTitle = document.getElementById('question-title');

    // Activate and unhide start button
    startButton.disabled = false;
    startButton.classList.remove('hidden');

    // Disable and hide submit button
    submitButton.disabled = true;
    submitButton.classList.add('hidden');

    // Show question title text
    questionTitle.textContent = question.title;
    questionTitle.classList.add('h3');
    questionTitle.classList.remove('hidden');

    startButton.onclick = function (evt) {
        // Activate and unhide submit button
        submitButton.disabled = false;
        submitButton.classList.remove('hidden');

        // Disable and hide start button
        startButton.disabled = true;
        startButton.classList.add('hidden');
        startButton.onclick = undefined;

        // unhide bubbleContainer and start listening clicks
        bubbleContainer.classList.remove('hidden');
        bubbleContainer.onclick = bubbleClickHandler;

        startGame();
    };

    gameForm.onsubmit = function (evt) {
        if (submitOnGameStop) return;

        evt.preventDefault();
        document.querySelectorAll('.bubble').forEach((bubble) => { destroyBubble(bubble); });
        playNextRound(questions, currentQuestion + 1);
        return false;
    }
}

async function handleResponse(response) {
    const contentType = response.headers.get('content-type');

    if (!contentType.includes('application/json')) {
        throw new Error(`Sorry, content-type '${contentType}' not supported`);
    }

    if (!response.ok) {
        return Promise.reject({
            status: response.status,
            statusText: response.statusText
        });
    }

    return await response.json();
}

function handleError(error) {
    const alertContainer = document.getElementById('alert');
    alertContainer.classList.add('alert', 'alert-danger');
    alertContainer.classList.remove('hidden');
    alertContainer.textContent = 'The loading of the exercise failed!';
}
