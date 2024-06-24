const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Custom physics questions
const physicsQuestions = [
    {
        question: "आवेश का परिमाणीकरण",
        choices: ["F=QE", "E=kQ/r2", "Q=+-Ne", "V=kq/r"],
        answer: 3 // Index of the correct choice in the choices array
    },
    {
        question: "दो बिंदु आवेशों के बीच बल",
        choices: ["E=-dV/dr", "U=k q1q2/r2", "F=QE", "F=kQ1Q2/r2"],
        answer: 4
    },
    {
        question: "What is the formula for momentum?",
        choices: ["F = ma", "p = mv", "E = mc^2", "F = G * (m1 * m2) / r^2"],
        answer: 1
    }
    // Add more questions as needed
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3; // Adjust the number of questions as needed

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...physicsQuestions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerText = currentQuestion.choices[index];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame();
