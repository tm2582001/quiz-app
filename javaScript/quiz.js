let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);
let queryselector = (query) => document.querySelector(query);

let questionNumber = 0, quiztimer, questionTimer;
let questionAnswersGiven = 0;


function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

let checkAnswer = (answerGiven, rightAnswer, options) => {

    if (answerGiven === b64_to_utf8(rightAnswer)) {
        id(answerGiven).style.border = "1px solid #00ff00";
        questionAnswersGiven++;
    } else {
        if (answerGiven) {
            id(answerGiven).style.border = "1px solid #ff0000";

        }
        // debugger;
        options.map(option => {
            if (option === b64_to_utf8(rightAnswer)) {
                try{

                    id(option).style.border = "1px solid #00ff00";
                }
                catch(err){
                    console.log(err);
                }
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

}


let displayInitialData = (quizChosen) => {
    id("quiz-title").innerHTML = quizChosen.title;
    let date = new Date(quizChosen.createdAt);
    date = new Date(date.getTime());
    id("created-at").innerHTML = date;
    id("quiz-time").innerHTML = `Max time of quiz is ${quizChosen.totalTime} sec`;
    id("question-time").innerHTML = `Max time to solve a question is ${quizChosen.timePerQuestion} sec`;
    

    classes("start-quiz")[0].style.display = "inline-block";


    let remainingtimeForQuiz = quizChosen.totalTime;
    let checkTimeForQuiz = () => {
        if (remainingtimeForQuiz === 0) {

            if (questionNumber < quizChosen.data.length) {
                
                let answerGiven = queryselector("input[name='answer']:checked");
                if (answerGiven) {
                    answerGiven = answerGiven.value;
                }
                checkAnswer(answerGiven, quizChosen.data[questionNumber].answer, quizChosen.data[questionNumber].options);
                
            }

            console.log(questionAnswersGiven);
            sessionStorage.setItem("questionanswersGiven", questionAnswersGiven);
            window.location = "result.html";
        } else {
            remainingtimeForQuiz--;
            id("quiz-time-left").innerHTML = remainingtimeForQuiz;
            quiztimer = setTimeout(checkTimeForQuiz, 1000);
        }
    }

    let remainingTimeForQuestion = quizChosen.timePerQuestion;

    let checkTimeforQuestion = () => {
        if (remainingTimeForQuestion === 0) {
            let answerGiven = queryselector("input[name='answer']:checked");
            if (answerGiven) {
                answerGiven = answerGiven.value;
            }
            remainingTimeForQuestion = quizChosen.timePerQuestion;
            checkAnswer(answerGiven, quizChosen.data[questionNumber].answer, quizChosen.data[questionNumber].options);
            questionNumber++;

        } else {

            id("question-time-left").innerHTML = remainingTimeForQuestion;
            remainingTimeForQuestion--;
            id("question-time-left").innerHTML = remainingTimeForQuestion;
            questionTimer = setTimeout(checkTimeforQuestion, 1000);
        }
    }

    classes("start-quiz")[0].addEventListener("click", () => {
        renderQuestion(quizChosen.data[questionNumber]);

        id("quiz-time-left").innerHTML = remainingtimeForQuiz;
        quiztimer = setTimeout(checkTimeForQuiz, 1000);

        id("question-time-left").innerHTML = remainingTimeForQuestion;
        questionTimer = setTimeout(checkTimeforQuestion, 1000);
    });


    classes("next")[0].addEventListener("click", () => {
        if (questionNumber >= quizChosen.data.length) {
            clearInterval(quiztimer);
            console.log(questionAnswersGiven);
            sessionStorage.setItem("questionanswersGiven", questionAnswersGiven);
            window.location = "result.html";
        } else if (questionNumber === (quizChosen.data.length - 1)) {
            classes("next")[0].innerHTML = "Show Result";
            renderQuestion(quizChosen.data[questionNumber]);
            id("question-time-left").innerHTML = remainingTimeForQuestion;
            quiztimer = setTimeout(checkTimeforQuestion, 1000);

        } else {
            renderQuestion(quizChosen.data[questionNumber]);
            id("question-time-left").innerHTML = remainingTimeForQuestion;
            quiztimer = setTimeout(checkTimeforQuestion, 1000);

        }
    });

    classes("submit")[0].addEventListener("click", () => {
        let answerGiven = queryselector("input[name='answer']:checked");
        if (answerGiven) {
            answerGiven = answerGiven.value;
        }
        clearInterval(questionTimer);
        remainingTimeForQuestion = quizChosen.timePerQuestion;
        checkAnswer(answerGiven, quizChosen.data[questionNumber].answer, quizChosen.data[questionNumber].options);
        questionNumber++;

    });
}




window.addEventListener('load', () => {
    const params = (new URL(document.location)).searchParams;
    const quizChosen = params.get('quiz');
    displayInitialData(eval(quizChosen));
});