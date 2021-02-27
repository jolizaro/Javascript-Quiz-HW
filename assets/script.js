var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = 120;
var timerElement = document.getElementById("countdown");
var submitScoreElement = document.querySelector("#submit-score");
var userScoreElement = document.getElementById("user-score");
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var optionOne = document.getElementById("choice0")
var optionTwo = document.getElementById("choice1")
var optionThree = document.getElementById("choice2")
var optionFour = document.getElementById("choice3")
var answerBtn0 = document.querySelector("#btn0")
var answerBtn1 = document.querySelector("#btn1")
var answerBtn2 = document.querySelector("#btn2")
var answerBtn3 = document.querySelector("#btn3")



var questionNumber = -1;
var answer;
var questions = [
    {
        text: "What is HTML?", 
        answers: ["HyperText Markup Language","Happy Time Money Love", "CSS", "Hit The Money Loaf"],
        correctAnswer: "HyperText Markup Language"
    },
    {
        text: "What is HTML?", 
        answers: ["HyperText Markup Language","Happy Time Money Love", "opt3", "opt4"],
        correctAnswer: "HyperText Markup Language"
    },
    {
        text: "What is HTML?", 
        answers: ["HyperText Markup Language","Happy Time Money Love", "opt3", "opt4"],
        correctAnswer: "HyperText Markup Language"
    },
    {
        text: "What is HTML?", 
        answers: ["HyperText Markup Language","Happy Time Money Love", "opt3", "opt4"],
        correctAnswer: "HyperText Markup Language"
    },
    {
        text: "What is HTML?", 
        answers: ["HyperText Markup Language","Happy Time Money Love", "opt3", "opt4"],
        correctAnswer: "HyperText Markup Language"
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
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    correctAnswer = questions[questionNumber].correctAnswer

    questionHead.textContent = questions[questionNumber].text;
    optionOne.textContent = questions[questionNumber].answers[0]
    optionTwo.textContent = questions[questionNumber].answers[1]
    optionThree.textContent = questions[questionNumber].answers[2]
    optionFour.textContent = questions[questionNumber].answers[3]


    // answerChoices.innerHTML = "";

    // var choices = questions[questionNumber].choices;

    // for (var q = 0; q < choices.length; q++) {
    //     var nextChoice = document.createElement("button");

    //     nextChoice.textContent = choices[q]
    //     answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    // }
}

function checkAnswer(event) {
    var isCorrect = event.target.innerText == questions[questionNumber].correctAnswer
    console.log(isCorrect)
    
}

// display option to enter name to scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreElement.textContent = "FINAL SCORE: " + secondsLeft + ".";
}
console.log ('hello')
// Event Listeners for Main Buttons
startBtn.addEventListener("click", startTimer);
answerBtn0.addEventListener("click", checkAnswer)
answerBtn1.addEventListener("click", checkAnswer)
answerBtn2.addEventListener("click", checkAnswer)
answerBtn3.addEventListener("click", checkAnswer)
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './highscores.html'
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // create a new object with name and score keys
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    // check if there are scores in local storage first and take value
    //if not, make a blank array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // push object into score array
    highScores.push(newScore)
    // turn objects into an array of strings + put it into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display='none'
}

function showFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.removeAttribute('style');
}

// answerChoices.addEventListener("click", function (event) {
//     var pElement = document.getElementsByClassName("feedback")[0]
    
//     // evaluation of user's answer choices & feedback
//     if (answer === event.target.textContent) {   
//         pElement.innerHTML = "YES!";
//         setTimeout(hideFeedback,1225);
//         showFeedback();   
        
//     } else {
//         pElement.innerHTML = "WRONG.";
//         setTimeout(hideFeedback,1225);
//         secondsLeft = secondsLeft - 20;
//         showFeedback();
//     }    
//     makeQuestions();
// });