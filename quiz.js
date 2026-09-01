const Start_screen = document.getElementById('Start_screen');
const Quiz_screen = document.getElementById('Quiz_screen');
const Res_screen = document.getElementById('Res_screen');

const start_btn = document.getElementById('start_btn');
const restart_btn = document.getElementById('restart_btn');
const question_txt = document.getElementById('question_txt');
const totalQuestionsSpan = document.getElementById('totalQuestionsSpan');
const scoreSpan = document.getElementById('score');
const answersContainer = document.getElementById('answersContainer');
const ResultP = document.getElementById('ResultP');
const progressbar = document.getElementById('progress');



const currentQuestionSpan = document.getElementById('currentQuestionSpan');
let currentQindex = 0;
let score = 0;
let answerDisabled = false;
start_btn.addEventListener('click',start);
restart_btn.addEventListener('click',restart);



//list of Qs
const QuestionList = [
    {
        question:'What is the largest planet in our solar system?',
        answers: [
            {text:'Jupiter', correct:true},
            {text:'Venus', correct:false},
            {text:'Mercury', correct:false},
            {text:'Mars', correct:false},
        ]
    },
    {
        question:'What is the name of the galaxy that contains our solar system?',
        answers: [
            {text:'35', correct:false},
            {text:'100', correct:false},
            {text:'The Milky Way', correct:true},
            {text:'56', correct:false},
        ]
    },
    {
        question:'What is the name of the largest moon in our solar system?',
        answers: [
            {text:'35', correct:false},
            {text:'100', correct:false},
            {text:'20', correct:false},
            {text:'Ganymede', correct:true},
        ]
    },
    {
        question:'Which space probe was launched in 1977 and has now left our solar system?',
        answers: [
            {text:'35', correct:false},
            {text:'Voyager 1.', correct:true},
            {text:'20', correct:false},
            {text:'56', correct:false},
        ]
    },
    {
        question:'What is the process by which light is produced in the Sun and other stars?',
        answers: [
            {text:'Nuclear fusion', correct:true},
            {text:'100', correct:false},
            {text:'20', correct:false},
            {text:'56', correct:false},
        ]
    },
]

//span
totalQuestionsSpan.textContent = QuestionList.length;
scoreSpan.textContent = QuestionList.length;

function start() {
    //reset
    currentQindex = 0;
    score = 0;
    answerDisabled = false;
    scoreSpan.textContent = 0;

    Start_screen.classList.remove('active');
    Quiz_screen.classList.add('active');

    showQ();
}

function showQ() {
    answerDisabled = false

    const currentQ = QuestionList[currentQindex];
    currentQuestionSpan.textContent = currentQindex+1;
    

    question_txt.textContent = currentQ.question;
    answersContainer.textContent = "";


    let progress = (currentQindex / QuestionList.length) * 100;
    progressbar.style.width = progress + '%';

    //button
    currentQ.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.textContent = answer.text;

        button.classList.add('answer-btn');

        button.dataset.correct = answer.correct;
        button.addEventListener('click',Select);
        answersContainer.appendChild(button);

    } )

}

function Select(event) {
    if(answerDisabled) return;

    answerDisabled = true;

    const selectedBTN = event.target;
    const iscorrect = selectedBTN.dataset.correct === "true";

    Array.from(answersContainer.children).forEach((button) => {

        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }else if (button === selectedBTN){
            button.classList.add('incorrect');
        }
    });

    
    
    if (iscorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQindex++;

        if (currentQindex < QuestionList.length) {
            showQ();
        } else {
            showR();
        }
        
    }, 500);

}

function showR(){

    Quiz_screen.classList.remove('active');
    Res_screen.classList.add('active');

    ResultP.textContent = score + ' out of ' + QuestionList.length;
}

function restart() {
    Res_screen.classList.remove('active');
    
    start();

}
