let id = (id)=>document.getElementById(id);
let classes = (classes)=>document.getElementsByClassName(classes);

let questionNumber = 0;

let renderQuestion = (question)=>{
        questionNumber++;
        console.log(question);
}


let displayInitialData = (quizChosen)=>{
    id("quiz-title").innerHTML = quizChosen.title;
    id("quiz-time").innerHTML = `Max time of quiz is ${quizChosen.totalTime} sec`;
    id("question-time").innerHTML = `Max time to solve a question is ${quizChosen.timePerQuestion} sec`;
    classes("start-quiz")[0].style.display = "inline-block";
    classes("start-quiz")[0].addEventListener("click",()=>{
        renderQuestion(quizChosen.data[questionNumber]);
    });
}




window.addEventListener('load', ()=>{
    const params = (new URL(document.location)).searchParams;
    const quizChosen = params.get('quiz');
    displayInitialData(eval(quizChosen));
});