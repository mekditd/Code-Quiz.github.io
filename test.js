// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var category = document.getElementById("category");
var question = document.getElementById("question");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");

var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// create our questions
var questions = [
    {
        category: "Geography",

        question: "What is the capital of the American state of Arizona?",
        choiceA: "Phoenix",
        choiceB: "Montgomery",
        choiceC: "Tallahassee",
        correct_answer: "A",
        choiceD: "Raleigh"
    },
    {
        category: "Sports",

        question: "Which driver has been the Formula 1 world champion for a record 7 times?",
        choiceA: "Michael Schumacher",
        choiceB: "Ayrton Senna",
        choiceC: "Fernando Alonso",
        choiceD: "Jim Clark",
        correct_answer: "A"

    },
    {
        category: "General Knowledge",

        question: "Which of the General Mills Corporation&#039;s monster cereals was the last to be released in the 1970&#039;s?",
        choiceA: "Fruit Brute",
        choiceB: "Count Chocula",
        choiceC: "Franken Berry",
        choiceD: "Boo-Berry",
        correct_answer: "A",

    },
    {
        category: "Celebrities",

        question: "Which radio personality calls himself &quot;The King of All Media&quot;?",
        choiceA: "Howard Stern",
        choiceB: "Rush Limbaugh",
        choiceC: "Pete Tong",
        choiceD: "Ryan Seacrest",
        correct_answer: "A"

    },
    {
        category: "Entertainment: Musicals & Theatres",

        question: "&quot;Doctor Who&quot; star David Tennant performed in a rendition of which Shakespearean play?",
        choiceA: "Hamlet",
        choiceB: "The Tempest",
        choiceC: "Othello",
        choiceD: "The Taming of the Shrew",
        correct_answer: "A"

    },

    {
        category: "Mythology",

        question: "Which of these mythological creatures is said to be half-man and half-horse?",
        choiceA: "Centaur",
        choiceB: "Minotaur",
        choiceC: "Pegasus",
        choiceD: "Gorgon",
        correct_answer: "A"

    },
    {
        category: "Entertainment: Books",

        question: "What&#039;s the second book in George R. R. Martin&#039;s &#039;A Song of Ice and Fire&#039; series?",
        choiceA: "A Clash of Kings",
        choiceB: "A Dance with Dragons",
        choiceC: "A Storm of Swords",
        choiceD: "A Feast for Crows",
        correct_answer: "A "

    },
    {
        category: "Entertainment: Japanese Anime & Manga",

        question: "Which Pok&eacute;mon and it&#039;s evolutions were banned from appearing in a main role after the Episode 38 Incident?",
        choiceA: "The Porygon Line",
        choiceB: "The Pikachu Line",
        choiceC: "The Elekid Line",
        choiceD: "The Magby Line",
        correct_answer: "A"

    },
    {
        category: "Entertainment: Television",

        question: "Klingons express emotion in art through opera and poetry.",
        choiceA: "True",
        choiceB: "False",
        correct_answer: "A"

    },
    {
        category: "Entertainment: Film",

        question: "Leonardo DiCaprio won an Oscar for Best Actor in 2004&#039;s &quot;The Aviator&quot;.",
        choiceA: "False",
        choiceB: "True",
        correct_answer: "A"

    }


];

// create some variables

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 0;
var questionTime = 10; // 10s
var gaugeWidth = 0; // 150px
var gaugeUnit = gaugeWidth / questionTime;
var TIMER;
var score = 0;

// render a question
function renderQuestion() {
    var q = questions[runningQuestion];

    category.innerHTML = "<p>" + q.category + "</p>";
    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;

}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";

    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (var qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct_answer) {
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    } else {
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score / questions.length);

        scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
// Restart Game
function restartGame() {
    window.location.reload();
};