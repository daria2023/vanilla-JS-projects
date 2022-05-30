const quizData = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Who is the President of US?",
        a: "Donald Trump",
        b: "Joe Biden",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
    
];

const quiz = document.querySelector('.quiz');
const content = document.querySelector('.quiz-content');
const question = document.querySelector('.quiz-header');

let i = 0;
let correctNum = 0;

showContent(i)

function showContent (i){
    if(i < quizData.length) {
    content.innerHTML = `
        <h4 class="'quiz-header">
            ${quizData[i].question}
        </h4>
        <ul class="quiz-choices">   
            <li class="quiz-choice">
                <input type="radio" name="answer" id='a' value='a' class='choice'>
                <label for="a">A.${quizData[i].a}</label>
            </li>
            <li class="quiz-choice">
                <input type="radio" name="answer" id='b' value='b' class='choice'>
                <label for="b">B.${quizData[i].b}</label>
            </li>
            <li class="quiz-choice">
                <input type="radio" name="answer" id='c' value='c' class='choice'>
                <label for="c">C.${quizData[i].c}</label>
            </li>
            <li class="quiz-choice">
                <input type="radio" name="answer" id='d' value='d' class='choice'>
                <label for="d">D.${quizData[i].d}</label>
            </li>
        </ul>
        <button class="quiz-btn" type='submit'}>submit</button>`       
    } else {
        showResult();
    }   
}


content.addEventListener('submit',(e)=>{
        e.preventDefault();
        const choices = document.querySelectorAll('.choice');
        (Array.from(choices)).map(choice => checkAnswer(choice, i));
        // choices.map(choice => console.log(choice));
        i++;  
        showContent(i);      
    })


function checkAnswer(choice,i ) {
    let answer ;
    choice.checked === true ? answer = choice.value : null;
    answer === quizData[i].correct ? correctNum++ : correctNum;
}

function showResult(){
    content.innerHTML = `
    <h4 class='result'>you corret ratio is ${correctNum}/${quizData.length}! </h4>
    <button onclick="location.reload()">reload</button>
    `
}

