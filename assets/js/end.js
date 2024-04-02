let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const scoreText = document.querySelector("#score-text");

let score = JSON.parse(localStorage.getItem("score"));
scoreText.innerText = score;
const saveBtn = document.getElementById("save-btn");
const inputUser = document.querySelector("input");
const saveUserToLocal = function () {
  const userName = inputUser.value;

  if (!userName || !score) {
    alert("InValid Data");
  } else {
    const user = {
      username: userName,
      score,
    };
    highScores.push(user);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    location.assign("../../index.html");
  }
};

saveBtn.addEventListener("click", saveUserToLocal);
