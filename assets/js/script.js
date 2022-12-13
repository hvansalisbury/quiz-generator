const body = document.getElementById('body');
const makeQuiz = document.getElementById('make-quiz');
const content = document.getElementById('content');

var savedQuestion = {};
const questionHeaderText = document.getElementById('question-header-text');
const questionFormSection = document.getElementById('question-form-section');
const questionForm = document.getElementById('question-form');
const addQuestionBtn = document.getElementById('add-question-button');
const questionInput = document.getElementById('question-input');
const choice1Input = document.getElementById('choice-1-input');
const choice2Input = document.getElementById('choice-2-input');
const choice3Input = document.getElementById('choice-3-input');
const choice4Input = document.getElementById('choice-4-input');
const choice1Radio = document.getElementById('choice-1-radio');
const choice2Radio = document.getElementById('choice-2-radio');
const choice3Radio = document.getElementById('choice-3-radio');
const choice4Radio = document.getElementById('choice-4-radio');
var userQuiz = [];

const currentMessage = document.getElementById('current-message');
const anotherQuestionEl = document.getElementById('another-question');
const newQuestionBtn = document.getElementById('new-question-button');
const completeQuizBtn = document.getElementById('complete-quiz-button');

const quizMade = document.getElementById('quiz-made');
const quizReviewBox = document.getElementById('quiz-review-box');
const editQuestionBtn = document.getElementById('edit-question-button');
const deleteQuestionBtn = document.getElementById('delete-question-button');
const saveQuizBtn = document.getElementById('save-quiz-button');

const editQuizSection = document.getElementById('edit-quiz');
const dropdownQuestionBtn = document.querySelector('.dropdown-question-button');
const dropdownQuestionList = document.getElementById('dropdown-question-list');
const dropdownQuizBtn = document.querySelector('.dropdown-quiz-button');
const dropdownQuizList = document.getElementById('dropdown-quiz-list');
var quizIndex;

const deleteQuestionSection = document.getElementById('delete-question-section');
const deleteQuestionContainer = document.getElementById('delete-question-container');

const saveQuizSection = document.getElementById('save-quiz-section');

var storedQuizzes = [];

const nameQuizForm = document.getElementById('name-quiz-form');
const userQuizName = document.getElementById('user-quiz-name');
const quizTime = document.getElementById('quiz-time');

const quizSelectedSection = document.getElementById('quiz-selected-section');
const reviewQuizBtn = document.getElementById('review-quiz-button');
const playQuizBtn = document.getElementById('play-quiz-button');
const scoresBtn = document.getElementById('scores-button');

const storedQuizSection = document.getElementById('stored-quiz-section');

const renderedQuizSection = document.getElementById('rendered-quiz-section');
const renderedQuizContainer = document.getElementById('rendered-quiz-container');
const renderedChoice1 = document.getElementById('rendered-choice1');
const renderedChoice2 = document.getElementById('rendered-choice2');
const renderedChoice3 = document.getElementById('rendered-choice3');
const renderedChoice4 = document.getElementById('rendered-choice4');

const startQuizSection = document.getElementById('start-quiz-section');
const enterNameForm = document.getElementById('enter-name-form');
const userNameInput = document.getElementById('user-name-input');
const nameBtn = document.getElementById('name-button');

var userName = '';
var user = {};
var userCorrect;
var userScore;
var currentQuiz = [];

const timerText = document.getElementById('timer-text');
var timeInSeconds = '';
const scoreText = document.getElementById('score-text');

var totalQuestions;

var n;

const endQuizSection = document.getElementById('end-quiz-section');
const endQuizContainer = document.getElementById('end-quiz-container');

const tryAgainBtn = document.getElementById('try-again-button');

const scoresSection = document.getElementById('scores-section');
const scoresContainer = document.getElementById('scores-container');

const homeBtn = document.getElementById('home');
const deleteAllBtn = document.getElementById('delete-all');

function addQuestion() {
  questionInput.focus();
  const userQuestion = questionInput.value;
  const userChoice1 = choice1Input.value;
  const userChoice2 = choice2Input.value;
  const userChoice3 = choice3Input.value;
  const userChoice4 = choice4Input.value;
  const userRadio1 = choice1Radio.checked;
  const userRadio2 = choice2Radio.checked;
  const userRadio3 = choice3Radio.checked;
  const userRadio4 = choice4Radio.checked;
  userRadio1.defaultChecked;

  savedQuestion = {
    question: userQuestion,
    choice1: {
      choice1Text: userChoice1,
      correct: userRadio1
    },
    choice2: {
      choice2Text: userChoice2,
      correct: userRadio2
    },
    choice3: {
      choice3Text: userChoice3,
      correct: userRadio3
    },
    choice4: {
      choice4Text: userChoice4,
      correct: userRadio4
    }
  }
  userQuiz.push(savedQuestion);
  questionForm.reset();
  anotherQuestion()
}

function anotherQuestion() {
  hideAllSections();
  anotherQuestionEl.classList.remove('hidden');
  questionHeaderText.textContent = 'Would you like to add another question?';
  currentMessage.innerHTML = ''
  currentMessage.textContent = 'QUESTION ADDED!'
  setTimeout(function () {
    currentMessage.innerHTML = '';
  }, 3000);
}

function completeQuiz() {
  for (let i = 0; i < userQuiz.length; i++) {
    let questionContainer = document.createElement('div');
    let reviewQuestionEl = document.createElement('h5');
    let reviewChoice1El = document.createElement('h5');
    let reviewChoice1TrueEl = document.createElement('span');
    let reviewChoice2El = document.createElement('h5');
    let reviewChoice2TrueEl = document.createElement('span');
    let reviewChoice3El = document.createElement('h5');
    let reviewChoice3TrueEl = document.createElement('span');
    let reviewChoice4El = document.createElement('h5');
    let reviewChoice4TrueEl = document.createElement('span');
    let spacer = document.createElement('br');

    questionContainer.classList.add('question-container')
    reviewQuestionEl.textContent = `${i + 1}. ${userQuiz[i].question}`;
    reviewChoice1El.textContent = `A) ${userQuiz[i].choice1.choice1Text} - `;
    reviewChoice1TrueEl.textContent = userQuiz[i].choice1.correct;
    reviewChoice2El.textContent = `B) ${userQuiz[i].choice2.choice2Text} - `;
    reviewChoice2TrueEl.textContent = userQuiz[i].choice2.correct;
    reviewChoice3El.textContent = `C) ${userQuiz[i].choice3.choice3Text} - `;
    reviewChoice3TrueEl.textContent = userQuiz[i].choice3.correct;
    reviewChoice4El.textContent = `D) ${userQuiz[i].choice4.choice4Text} - `;
    reviewChoice4TrueEl.textContent = userQuiz[i].choice4.correct;

    quizReviewBox.appendChild(questionContainer);
    questionContainer.appendChild(reviewQuestionEl);
    questionContainer.appendChild(reviewChoice1El);
    reviewChoice1El.appendChild(reviewChoice1TrueEl);
    questionContainer.appendChild(reviewChoice2El);
    reviewChoice2El.appendChild(reviewChoice2TrueEl);
    questionContainer.appendChild(reviewChoice3El);
    reviewChoice3El.appendChild(reviewChoice3TrueEl);
    questionContainer.appendChild(reviewChoice4El);
    reviewChoice4El.appendChild(reviewChoice4TrueEl);
    questionContainer.appendChild(spacer);
  }
};

function renderQuestionDropdown() {
  dropdownQuestionList.innerHTML = '';
  for (let i = 0; i < userQuiz.length; i++) {
    let dropdownQuestionItem = document.createElement('h5');
    dropdownQuestionItem.textContent = `Question ${i + 1}`;
    dropdownQuestionItem.classList.add('dropdown-item');
    dropdownQuestionItem.setAttribute('data-index', i);
    dropdownQuestionList.appendChild(dropdownQuestionItem);
  }
}

function dropdownQuestionClick() {
  dropdownQuestionList.classList.toggle("show");
  if (dropdownQuestionBtn.textContent === 'Quiz Questions ▲') {
    dropdownQuestionBtn.textContent = 'Quiz Questions ▼';
  } else {
    (dropdownQuestionBtn.textContent = 'Quiz Questions ▲');
    renderQuestionDropdown();
  };
};

function renderQuizDropdown() {
  dropdownQuizList.innerHTML = '';
  for (let i = 0; i < storedQuizzes.length; i++) {
    let dropdownQuizItem = document.createElement('h3');
    dropdownQuizItem.textContent = storedQuizzes[i].title;
    dropdownQuizItem.classList.add('dropdown-item');
    dropdownQuizItem.setAttribute('data-index', i);
    dropdownQuizList.appendChild(dropdownQuizItem);
  }
  setTimeout(function () {
    dropdownQuizList.classList.remove("show");
  }, 3000);
}

function dropdownQuizClick() {
  if (storedQuizzes.length > 0) {
    dropdownQuizList.classList.toggle("show");
    if (dropdownQuizBtn.textContent === 'Stored Quizzes ▲') {
      dropdownQuizBtn.textContent = 'Stored Quizzes ▼';
    } else {
      (dropdownQuizBtn.textContent = 'Stored Quizzes ▲');
      renderQuizDropdown();
    };
  }
};

function renderDeleteQuestions() {
  deleteQuestionContainer.innerHTML = '';
  for (let i = 0; i < userQuiz.length; i++) {
    let questionToDeleteBtn = document.createElement('button');
    questionToDeleteBtn.textContent = `Question ${i + 1}`;
    questionToDeleteBtn.classList.add('delete-item');
    questionToDeleteBtn.setAttribute('data-index', i);
    deleteQuestionContainer.appendChild(questionToDeleteBtn);
  }
};

function storeQuiz() {
  let quizTitle = userQuizName.value.charAt(0).toUpperCase() + userQuizName.value.slice(1).toLowerCase();
  let userQuizTime = parseInt(60 * quizTime.value);
  let savedQuiz = { title: quizTitle, quiz: userQuiz, scores: [], time: userQuizTime };
  let quizTitles = [];
  for (let i = 0; i < storedQuizzes.length; i++) {
    quizTitles.push(storedQuizzes[i].title);
  };

  if (quizTitles.includes(quizTitle)) {
    console.log('Already Stored')
    quizIndex = quizTitles.indexOf(quizTitle);
    currentMessage.innerHTML = ''
    currentMessage.textContent = 'QUIZ ALREADY STORED!'
    setTimeout(function () {
      currentMessage.innerHTML = '';
    }, 3000);
  } else {
    quizIndex = storedQuizzes.length;
    storedQuizzes.push(savedQuiz);
    localStorage.setItem("stored-quizzes", JSON.stringify(storedQuizzes));
    currentMessage.innerHTML = '';
    currentMessage.textContent = `${quizTitle} STORED!`;
    setTimeout(function () {
      currentMessage.innerHTML = '';
    }, 3000);
  }
};

function getQuizzes() {
  let retreiveQuizzes = JSON.parse(localStorage.getItem('stored-quizzes'));
  if (retreiveQuizzes !== null) {
    storedQuizzes = retreiveQuizzes;
  }
};

function startQuiz() {
  userScore = 0;
  scoreText.textContent = userScore;
}

function startTimer() {
  timeInSeconds = parseInt(storedQuizzes[quizIndex].time);
  timer = setInterval(function () {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    if (seconds < 10) {
      timerText.innerHTML = `${minutes}:0${seconds}`;
    } else {
      timerText.innerHTML = `${minutes}:${seconds}`;
    }
    timeInSeconds--;
    if (timeInSeconds <= 0) {
      timerText.textContent = '00:00';
      clearInterval(timer);
      endQuiz();
      return;
    }
  }, 1000);
}

function playQuiz() {
  let numQuestions = currentQuiz.length;
  let questionNum = Math.floor(Math.random() * numQuestions);

  questionHeaderText.textContent = `${n}. ${currentQuiz[questionNum].question}`;
  renderedChoice1.textContent = `A) ${currentQuiz[questionNum].choice1.choice1Text}`;
  renderedChoice1.setAttribute('data-question-index', questionNum);
  renderedChoice2.textContent = `B) ${currentQuiz[questionNum].choice2.choice2Text}`;
  renderedChoice2.setAttribute('data-question-index', questionNum);
  renderedChoice3.textContent = `C) ${currentQuiz[questionNum].choice3.choice3Text}`;
  renderedChoice3.setAttribute('data-question-index', questionNum);
  renderedChoice4.textContent = `D) ${currentQuiz[questionNum].choice4.choice4Text}`;
  renderedChoice4.setAttribute('data-question-index', questionNum);
};

function endQuiz() {
  hideAllSections();
  endQuizSection.classList.remove('hidden');
  clearInterval(timer);
  timerText.textContent = '0:00';
  user = {
    name: userName,
    score: userScore
  };
  console.log(quizIndex);

  storedQuizzes[quizIndex].scores.push(user);
  questionHeaderText.textContent = `${userName}, your score is ${userScore}`;
  localStorage.setItem("stored-quizzes", JSON.stringify(storedQuizzes));
}

function renderScoresSection() {
  console.log(storedQuizzes[quizIndex].scores);
  if (storedQuizzes[quizIndex].scores.length > 0) {
    for (let i = 0; i < storedQuizzes[quizIndex].scores.length; i++) {
      let scoreEl = document.createElement('h5');
      scoreEl.textContent = `${storedQuizzes[quizIndex].scores[i].name} - ${storedQuizzes[quizIndex].scores[i].score}`;
      scoresContainer.appendChild(scoreEl);
    }
  } else {
    questionHeaderText.textContent = 'No Scores Stored';
  }
}

function hideAllSections() {
  questionFormSection.classList.add('hidden');
  anotherQuestionEl.classList.add('hidden');
  quizMade.classList.add('hidden');
  editQuizSection.classList.add('hidden');
  deleteQuestionSection.classList.add('hidden');
  saveQuizSection.classList.add('hidden');
  storedQuizSection.classList.add('hidden');
  quizSelectedSection.classList.add('hidden');
  startQuizSection.classList.add('hidden');
  renderedQuizSection.classList.add('hidden');
  endQuizSection.classList.add('hidden');
  scoresSection.classList.add('hidden');
}

dropdownQuestionBtn.addEventListener('click', function (event) {
  console.log('dropdown question button quiz clicked');
  dropdownQuestionClick();
});

dropdownQuizBtn.addEventListener('click', function (event) {
  console.log('dropdown quiz button quiz clicked');
  dropdownQuizClick();
});

makeQuiz.addEventListener('click', function (event) {
  console.log('make quiz clicked');
  hideAllSections();
  questionHeaderText.textContent = 'Write your question, answer choices, and mark the box for the correct answer';
  questionFormSection.classList.remove('hidden');
});

questionForm.addEventListener('submit', function (event) {
  console.log('question submitted');
  event.preventDefault();
  addQuestion();
});

newQuestionBtn.addEventListener('click', function (event) {
  console.log('new question button clicked');
  hideAllSections();
  currentMessage.innerHTML = ''
  currentMessage.textContent = 'ADD A NEW QUESTION'
  setTimeout(function () {
    currentMessage.innerHTML = '';
  }, 3000); questionHeaderText.textContent = 'Write your question, answer choices, and mark the box for the correct answer';
  questionFormSection.classList.remove('hidden');
});

completeQuizBtn.addEventListener('click', function (event) {
  console.log('quiz made button clicked');
  hideAllSections();
  questionHeaderText.textContent = 'You created a quiz!';
  quizMade.classList.remove('hidden');
  currentMessage.innerHTML = ''
  currentMessage.textContent = 'QUIZ MADE!'
  setTimeout(function () {
    currentMessage.innerHTML = '';
  }, 3000);
  completeQuiz();
});

editQuestionBtn.addEventListener('click', function (event) {
  console.log('edit quiz clicked');
  hideAllSections();
  quizReviewBox.innerHTML = '';
  questionHeaderText.textContent = 'Which question would you like to edit?';
  editQuizSection.classList.remove('hidden');
});

dropdownQuestionList.addEventListener('click', function (event) {
  console.log('dropdown question item clicked')
  let element = event.target;
  if (element.matches('h5')) {
    hideAllSections();
    let questionIndex = element.getAttribute('data-index');
    questionHeaderText.textContent = 'Question removed. Edit and add to the quiz.';
    questionFormSection.classList.remove('hidden');
    questionInput.value = userQuiz[questionIndex].question;
    choice1Input.value = userQuiz[questionIndex].choice1.choice1Text;
    choice2Input.value = userQuiz[questionIndex].choice2.choice2Text;
    choice3Input.value = userQuiz[questionIndex].choice3.choice3Text;
    choice4Input.value = userQuiz[questionIndex].choice4.choice4Text;
    choice1Radio.checked = userQuiz[questionIndex].choice1.correct;
    choice2Radio.checked = userQuiz[questionIndex].choice2.correct;
    choice3Radio.checked = userQuiz[questionIndex].choice3.correct;
    choice4Radio.checked = userQuiz[questionIndex].choice4.correct;
    userQuiz.splice(questionIndex, 1);
    currentMessage.innerHTML = ''
    currentMessage.textContent = `${element.textContent.toUpperCase()} SELECTED`
    setTimeout(function () {
      currentMessage.innerHTML = '';
    }, 3000);
  };
});

dropdownQuizList.addEventListener('click', function (event) {
  console.log('dropdown quiz item clicked')
  let element = event.target;
  if (element.matches('h3')) {
    hideAllSections();
    dropdownQuizList.classList.toggle("show");
    dropdownQuizBtn.textContent = 'Stored Quizzes ▲';
    quizIndex = element.getAttribute('data-index');
    console.log(userQuiz[quizIndex]);
    questionHeaderText.textContent = 'What would you like to do?';
    userQuiz = storedQuizzes[quizIndex].quiz;
    currentQuiz = userQuiz.slice();
    quizSelectedSection.classList.remove('hidden');
    console.log(currentQuiz)
  };
});

deleteQuestionBtn.addEventListener('click', function (event) {
  console.log('delete question clicked')
  hideAllSections();
  quizReviewBox.innerHTML = '';
  questionHeaderText.textContent = 'Which question would you like to delete?';
  deleteQuestionSection.classList.remove('hidden');
  renderDeleteQuestions();
});

deleteQuestionContainer.addEventListener('click', function (event) {
  console.log('question # to delete clicked')
  let element = event.target;
  if (element.matches('button')) {
    hideAllSections();
    let questionIndex = element.getAttribute('data-index');
    if (userQuiz.length > 1) {
      console.log(userQuiz[questionIndex]);
      questionHeaderText.textContent = 'Question deleted.';
      quizMade.classList.remove('hidden');
      userQuiz.splice(questionIndex, 1);
      currentMessage.innerHTML = ''
      currentMessage.textContent = `${element.textContent.toUpperCase()} DELETED!`;
      setTimeout(function () {
        currentMessage.innerHTML = '';
      }, 3000);

    } else {
      userQuiz.splice(questionIndex, 1);
      storedQuizzes.splice(quizIndex, 1);
      localStorage.setItem("stored-quizzes", JSON.stringify(storedQuizzes));
      questionHeaderText.textContent = 'What would you like to do?';
      currentMessage.innerHTML = ''
      currentMessage.textContent = 'QUIZ DELETED!'
      setTimeout(function () {
        currentMessage.innerHTML = '';
      }, 3000);
      return;
    }
  };
  completeQuiz();
});

saveQuizBtn.addEventListener('click', function (event) {
  console.log('save quiz clicked')
  hideAllSections();
  quizReviewBox.innerHTML = '';
  questionHeaderText.textContent = 'Please enter a name for your quiz';
  saveQuizSection.classList.remove('hidden');
  if (userQuiz) {

  };
  renderDeleteQuestions();
});

nameQuizForm.addEventListener('submit', function (event) {
  console.log('quiz stored')
  hideAllSections();
  event.preventDefault();
  questionHeaderText.textContent = 'What would you like to do?';
  quizSelectedSection.classList.remove('hidden');
  currentQuiz = userQuiz.slice();
  storeQuiz();
});

reviewQuizBtn.addEventListener('click', function (event) {
  console.log('reivew quiz clicked')
  hideAllSections();
  questionHeaderText.textContent = 'What would you like to do?';
  quizMade.classList.remove('hidden');
  completeQuiz();
});

playQuizBtn.addEventListener('click', function (event) {
  console.log('play quiz clicked')
  hideAllSections();
  questionHeaderText.textContent = 'Please enter your name';
  startQuizSection.classList.remove('hidden');
  userCorrect = 0;
  n = 1;
  startQuiz();
});

renderedQuizContainer.addEventListener('click', function (event) {
  console.log('answer selected')
  let element = event.target;
  if (element.matches('h3')) {
    console.log(element)
    let choiceQuestionIndex = element.getAttribute('data-question-index');
    let choiceKey = element.getAttribute('data-key');
    if (currentQuiz[choiceQuestionIndex][choiceKey].correct) {
      console.log(currentQuiz[choiceQuestionIndex][choiceKey].correct)
      userCorrect = userCorrect + 1;
      console.log(userCorrect)
      userScore = Math.round(100 * userCorrect / totalQuestions);
      console.log(userScore)
      scoreText.textContent = userScore;
      console.log(currentQuiz)
      currentMessage.innerHTML = ''
      currentMessage.textContent = `CORRECT ANSWER!`;
      setTimeout(function () {
        currentMessage.innerHTML = '';
      }, 3000);
    } else {
      currentMessage.innerHTML = ''
      currentMessage.textContent = `INCORRECT ANSWER`;
      setTimeout(function () {
        currentMessage.innerHTML = '';
      }, 3000);
    }
    currentQuiz.splice(choiceQuestionIndex, 1);
    console.log(currentQuiz.length);
    if (currentQuiz.length === 0) {
      hideAllSections();
      endQuizSection.classList.remove('hidden');
      currentMessage.innerHTML = ''
      currentMessage.textContent = `${userName}, YOU HAVE COMPLETED THE QUIZ!`;
      setTimeout(function () {
        currentMessage.innerHTML = '';
      }, 3000);
      endQuiz();
    } else {
      playQuiz();
    }
  }
});

enterNameForm.addEventListener('submit', function (event) {
  console.log('name entered')
  event.preventDefault();
  hideAllSections();
  renderedQuizSection.classList.remove('hidden');
  userName = userNameInput.value;
  totalQuestions = currentQuiz.length
  currentMessage.innerHTML = ''
  currentMessage.textContent = `GOOD LUCK ${userName}`;
  setTimeout(function () {
    currentMessage.innerHTML = '';
  }, 3000);
  startTimer();
  playQuiz();
});

tryAgainBtn.addEventListener('click', function (event) {
  console.log('try again clicked')
  currentQuiz = userQuiz.slice();
  hideAllSections();
  renderedQuizSection.classList.remove('hidden');
  userCorrect = 0;
  n = 1;
  currentMessage.innerHTML = ''
  currentMessage.textContent = `QUIZ RESTARTED!`;
  setTimeout(function () {
    currentMessage.innerHTML = '';
  }, 3000);
  startTimer();
  playQuiz();
});

scoresBtn.addEventListener('click', function (event) {
  console.log('scores clicked');
  hideAllSections();
  scoresSection.classList.remove('hidden');
  questionHeaderText.textContent = 'Scores';
  renderScoresSection();
});

homeBtn.addEventListener('click', function (event) {
  console.log('home clicked');
  if (timeInSeconds > 0) {
    clearInterval(timer);
    timeInSeconds = 0;
  }
  timerText.textContent = '0:00'
  hideAllSections();
  questionHeaderText.textContent = 'Welcome! What would you like to do?';
});

deleteAllBtn.addEventListener('click', function (event) {
  console.log('delete all clicked');
  let confirmDelete = confirm('This will delete all stored quizzes. Do you wish to continue?');
  if (confirmDelete) {
    hideAllSections();
    clearInterval(timer);
    timerText.textContent = '0:00'
    questionHeaderText.textContent = 'All stored quizzes deleted.';
    storedQuizzes = [];
    localStorage.setItem("stored-quizzes", JSON.stringify(storedQuizzes));
  }
});

getQuizzes();
