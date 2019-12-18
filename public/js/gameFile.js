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

const startButton = document.getElementById('start-game');
const submitButton = document.getElementById('grade');


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
    //door.parentNode.removeChild(door);
    door.remove();
}

function getGameStarter(question){
  const createDoor = getDoorCreator();
  let counter = 0;

  return function(){
    setTimeout(function(){
      let roundDoors = [];

      for(let i = 0; i < 3; i++){
        const doorData = question.options[i];
        roundDoors.push(createDoor(doorData));
      };
      dropDoors(roundDoors);
    },2000);
  }
}

function dropDoors(roundDoors){
  const doorsElem = document.getElementById('doors').getBoundingClientRect();
  const xPos = doorsElem.width/3;

  let yPos = 10;
  let doors = shuffle(roundDoors);
  for(let i = 0; i <= 2; i++){
    doors[i].style.left = `${xPos * i}px`;
    doors[i].style.top = `${yPos}px`;
  };

  let moveId = setInterval(function() {
    for(let i = 0; i <= 2; i++){
      doors[i].style.top = `${yPos}px`;
      doors[i].style.display = 'block';
    };
      yPos += 1;

      if(yPos === doorsElem.height - 160){
        for(let i = 0; i <= 2; i++){
          if(doors[i].dataset.correct === 'true'){
            doors[i].classList.add('green');
          }else{
            doors[i].classList.add('red');
          }
        };
      }
      if (yPos > doorsElem.height - 155) {
        for(let i = 0; i <= 2; i++){
          destroyDoor(doors[i]);
        }
          getDoorClickHandler(doors);
          submitButton.click();
          startButton.click();
          clearInterval(moveId);

      };
  }, 20);

}

function getDoorCreator(){
  const doors = document.getElementById('doors');

  return function(doorData){
    const doorDiv = document.createElement('div');
    doorDiv.classList.add('door');

    doorDiv.dataset.id = doorData.option;
    doorDiv.dataset.correct = doorData.correctness;
    doorDiv.dataset.speech = doorData.option;
    // hidden by default
    doorDiv.style.display = 'none';
    doorDiv.innerText = doorData.option;
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
 * Handler records answers to question.
 * @param {object} doors current doors
 */
function getDoorClickHandler(doors){

  const correctCounter = document.getElementById('correct');
  const wrongCounter = document.getElementById('wrong');

  var objectPos = document.getElementById('object');
  const objectRect = objectPos.getBoundingClientRect().width / 2;
  objectPos = parseInt(objectPos.style.left) + objectRect;

  const doorsElem = document.getElementById('doors').getBoundingClientRect();
  const xPos = doorsElem.width/3;

  let door;

  if ( objectPos < xPos) {
    door = doors[0];
  }
  else if (xPos <= objectPos && objectPos <= xPos *2) {
    door = doors[1];
  }
  else if (objectPos > xPos *2) {
    door = doors[2];
  }

  if (door.dataset.correct === 'true') {
    correctCounter.textContent =
        Number.parseInt(correctCounter.textContent) + 1;
        door.dataset.speech = 'ja taas mennään';
  }
  else if (door.dataset.correct === 'false') {
    wrongCounter.textContent =
        Number.parseInt(wrongCounter.textContent) + 1;
        door.dataset.speech = 'killalle reenaa';
  }

  responsiveVoice.speak(
      door.dataset.speech,
      'Finnish Female'
    );

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

    const object = document.getElementById('object');
    const gameForm = document.getElementById('game-form');
    const startGame = getGameStarter(question);

    const doorContainer = document.getElementById('doors');
    const questionTitle = document.getElementById('question-title');

    document.onmousemove = handleMouseMove;

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

        // Activate submit button
        submitButton.disabled = false;

        // Disable and hide start button
        startButton.disabled = true;
        startButton.classList.add('hidden');
        startButton.onclick = undefined;

        // unhide bubbleContainer and start listening clicks
        doorContainer.classList.remove('hidden');

        startGame();
    };

    gameForm.onsubmit = function (evt) {
        if (submitOnGameStop) return;

        evt.preventDefault();
        document.querySelectorAll('.door').forEach((door) => { destroyDoor(door) });
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

function handleMouseMove(event) {
    // Move the object
    const divRect = document.getElementById('doors').getBoundingClientRect();
    var object = document.getElementById('object');
    const objectRect = object.getBoundingClientRect();

    var xPos = Math.ceil(event.pageX - divRect.left - objectRect.width/2);
    if (xPos < 0) {
        xPos = 0;
    } else if (xPos > divRect.width - objectRect.width) {
        xPos = Math.ceil(divRect.width - objectRect.width);
    }
    object.style.left = xPos + 'px';
}
