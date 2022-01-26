let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

window.addEventListener('load', () => {
    let questionAnswersGiven =  sessionStorage.getItem("questionanswersGiven");
    id("result").innerHTML =questionAnswersGiven;
});