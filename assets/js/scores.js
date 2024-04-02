const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const container = document.querySelector(".container");
let index = 0;

const result = highScores.map((item) => {
  const elem = ` <div class="user-info">
            <div >
           <span>${index + 1}</span>
           <span>${item.username}</span>
           </div>
           <div>${item.score}</div>
            </div>`;
  return elem;
});

container.innerHTML = result.join("");
