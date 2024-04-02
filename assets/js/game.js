const container = document.querySelector(".container");
const loader = document.querySelector("#loader");
const questionElem = document.getElementById("question");
const answersBtn = document.querySelectorAll(".answers");
const scoreText = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const finishBtn = document.getElementById("finish-btn");
const questionNumber = document.getElementById("question-number");
const errorText = document.getElementById("error-text");
const level = localStorage.getItem("level") || "medium";
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
let formattedData = null;
let questionIndex = 0;
let correctIndex = null;
let isAccepted = true;
const SCORE_BONUS = 10;
let score = 0;
const formatData = function (data) {
  const formatted = data.map((data) => {
    const result = {
      question: data.question,
      answers: [...data.incorrect_answers],
    };
   let correctAnswerIndex = Math.floor(Math.random() * 4);
    result.correctAnswerIndex = correctAnswerIndex;
    result.answers.splice(correctAnswerIndex, 0, data.correct_answer);
    return result;
  });
  return formatted;
};

async function fetchData() {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json.results);
    formattedData = formatData(json.results);
    start();
  } catch (error) {
    loader.style.display = "none";
    errorText.style.display = "flex";
  }
}

const start = function () {
  showData();
  loader.style.display = "none";
  container.style.display = "block";
};

function checkAnswer(index) {
  if (!isAccepted) return;
  isAccepted = false;
  if (correctIndex === index) {
    event.target.classList.add("correct");
    score += SCORE_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answersBtn[correctIndex].classList.add("correct");
  }
}

function showData() {
  questionNumber.innerText = questionIndex + 1;
  questionElem.innerText = formattedData[questionIndex].question;
  correctIndex = formattedData[questionIndex].correctAnswerIndex;
  console.log(correctIndex);
  answersBtn.forEach((button, index) => {
    button.innerText = formattedData[questionIndex].answers[index];
    button.addEventListener("click", () => checkAnswer(index));
  });
}

const nextHandler = function () {
  questionIndex++;

  if (questionIndex < formattedData.length) {
    answersBtn.forEach((button) => {
      button.className = "answers";
    });
    isAccepted = true;
    showData();
  } else {
    finishHandler();
  }
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("../end/end.html");
};

window.addEventListener("load", fetchData);
nextBtn.addEventListener("click", nextHandler);
finishBtn.addEventListener("click", finishHandler);
