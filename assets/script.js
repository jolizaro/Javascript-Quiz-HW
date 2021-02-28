var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector(".submitBtn")
var highScoreBtn = document.querySelector(".highScoreBtn")
var secondsLeft = 120;
var timerElement = document.getElementById("countdown");
var submitScoreElement = document.querySelector("#submit-score");
var userScoreElement = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("question");

var optionOne = document.getElementById("choice0")
var optionTwo = document.getElementById("choice1")
var optionThree = document.getElementById("choice2")
var optionFour = document.getElementById("choice3")
var answerBtn0 = document.querySelector("#btn0")
var answerBtn1 = document.querySelector("#btn1")
var answerBtn2 = document.querySelector("#btn2")
var answerBtn3 = document.querySelector("#btn3")
var progress = document.querySelector("#progress")
var gameOverSection = document.querySelector(".gameOver")
var allButtons = document.querySelector(".buttons")
var leaderBoard = document.querySelector(".leaderboard")
var score = 0



var questionNumber = -1;

var questions = [
    {
        text: "What is HTML?",
        answers: ["HyperText Markup Language", "Happy Time Money Love", "CSS", "Hit The Money Loaf"],
        correctAnswer: "HyperText Markup Language"
    },
    {
        text: "Which language is used for styling web pages?",
        answers: ["HTML", "JQuery", "CSS", "XML"],
        correctAnswer: "CSS"
    },
    {
        text: "Which is not a JavaScript framework?",
        answers: ["Python Script", "JQuery", "DJango", "NodeJS"],
        correctAnswer: "DJango"
    },
    {
        text: "Which is used for Connect To Database?",
        answers: ["PHP", "HTML", "JS", "All"],
        correctAnswer: "PHP"
    },
    {
        text: "Webdevtrick.com is about ...",
        answers: ["Web Design", "Graphic Design", "SEO & Development", "All"],
        correctAnswer: "All"
    }
]



function startTimer() {

    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    // timer set and begins 120 second countdown
    setTimer();

    // create questions to display
    makeQuestions();
}

function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(gameOver, 500);
        }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    if (questionNumber === questions.length) {
        gameOver()
        return
    }
}


    questionHead.textContent = questions[questionNumber].text;
    optionOne.textContent = questions[questionNumber].answers[0]
    optionTwo.textContent = questions[questionNumber].answers[1]
    optionThree.textContent = questions[questionNumber].answers[2]
    optionFour.textContent = questions[questionNumber].answers[3]

function gameOver() {
    questionHead.className = "hide"
    document.querySelector("#question").className = "hide"
    progress.className = "hide"
    allButtons.className = "hide"
    document.querySelector("#finalscore").textContent =
        " Your score is " + score + " Out of " + questions.length;

    gameOverSection.classList.remove("hide")

}
var lastQuestion = -1

function checkAnswer(event) {
    if (questionNumber === lastQuestion) { //safety block so that the same question cannot be answered more than once
        return
    }
    if (questionNumber >= questions.length) {
        return
    }
    lastQuestion = questionNumber
    var isCorrect = event.target.innerText == questions[questionNumber].correctAnswer
    console.log(isCorrect)
    if (isCorrect) {
        score++
    }
    progress.textContent = score + "/" + questions.length
    setTimeout(makeQuestions, 1000)



}

// display option to enter name to scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreElement.textContent = "FINAL SCORE: " + secondsLeft + ".";
}
console.log('hello')
// Event Listeners for Main Buttons
startBtn.addEventListener("click", startTimer);
answerBtn0.addEventListener("click", checkAnswer)
answerBtn1.addEventListener("click", checkAnswer)
answerBtn2.addEventListener("click", checkAnswer)
answerBtn3.addEventListener("click", checkAnswer)
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addScore();
    gameOverSection.classList.add("hide")
    leaderBoard.classList.remove("hide")
    var quizScore = JSON.parse(localStorage.getItem("quizScore"))
    document.getElementById("highscore").textContent = quizScore.name + " : " + quizScore.score
});


function addScore() {
    userNameInput = document.getElementById("initials").value

    // create a new object with name and score keys
    var newScore = {
        name: userNameInput,
        score: score
    };
    // check if there are scores in local storage first and take value
    //if not, make a blank array
    var quizScore = localStorage.getItem("quizScore")
    if (quizScore) { //New score bigger than previous
        var highScore = JSON.parse(quizScore).score;
        if (score < highScore) {
            return

        }
    }
    localStorage.setItem("quizScore", JSON.stringify(newScore));
}