let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let queryselector = (query) => document.querySelector(query);

let questionNumber = 0;
let questionAnswersGiven;

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

let checkAnswer = (answerGiven, rightAnswer, options) => {

    if (answerGiven === b64_to_utf8(rightAnswer)) {
        id(answerGiven).style.border = "1px solid #00ff00";
    }else{
        id(answerGiven).style.border = "1px solid #ff0000";
        // debugger;
        options.map(option=>{
            if(option === b64_to_utf8(rightAnswer)){
                id(option).style.border = "1px solid #00ff00";
                console.log("here");
            }
        });
    }
}


let renderQuestion = (questionDetail) => {
    id("question").innerHTML = questionDetail.question;
    radioOption = id("radio-option");
    radioOption.innerHTML = "";

    questionDetail.options.map((option) => {
        let Div = document.createElement("div")
        Div.setAttribute("id", option);
        let RadioButton = document.createElement("input");
        RadioButton.setAttribute("type", "radio");
        RadioButton.setAttribute("name", "answer");
        RadioButton.setAttribute("value", option);

        let Label = document.createElement("label");
        Label.innerHTML = option;

        Div.appendChild(RadioButton);
        Div.appendChild(Label);
        radioOption.appendChild(Div);

    });
    

    console.log(questionDetail);
}


let displayInitialData = (quizChosen) => {
    id("quiz-title").innerHTML = quizChosen.title;
    id("quiz-time").innerHTML = `Max time of quiz is ${quizChosen.totalTime} sec`;
    id("question-time").innerHTML = `Max time to solve a question is ${quizChosen.timePerQuestion} sec`;
    classes("start-quiz")[0].style.display = "inline-block";
    classes("start-quiz")[0].addEventListener("click", () => {
        renderQuestion(quizChosen.data[questionNumber]);
    });

    classes("next")[0].addEventListener("click", () => {
        if (questionNumber >= quizChosen.data.length) {
            console.log("display-result");
        } else if (questionNumber === (quizChosen.data.length - 1)) {
            classes("next")[0].innerHTML = "Show Result";
            renderQuestion(quizChosen.data[questionNumber]);
        } else {
            renderQuestion(quizChosen.data[questionNumber]);
        }
    });

    classes("submit")[0].addEventListener("click", () => {
        let answerGiven = queryselector("input[name='answer']:checked").value;
        console.log(answerGiven, quizChosen.data[questionNumber].answer, quizChosen.data[questionNumber].options);
        checkAnswer(answerGiven, quizChosen.data[questionNumber].answer, quizChosen.data[questionNumber].options);
        questionNumber++;
        
    });
}




window.addEventListener('load', () => {
    const params = (new URL(document.location)).searchParams;
    const quizChosen = params.get('quiz');
    displayInitialData(eval(quizChosen));
});