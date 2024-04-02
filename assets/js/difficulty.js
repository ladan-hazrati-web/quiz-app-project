const buttons = document.querySelectorAll(".btn");

const selectLevel = function (e) {
  const level = e.target.innerText.toLowerCase();
  localStorage.setItem("level", level);
  location.assign("../../index.html");
};

buttons.forEach((button) => {
  button.addEventListener("click", selectLevel);
});
