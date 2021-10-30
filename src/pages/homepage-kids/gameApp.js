const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
let answer = 0;

const tryAgainAudio = document.getElementById("try_again_audio");

function generateEquation() {
  let number1 = Math.trunc(Math.random() * 7) + 1;
  let number2 = Math.trunc(Math.random() * 7) + 1;
  let answer1 = Math.trunc(Math.random() * 7) + 1;
  let answer2 = Math.trunc(Math.random() * 7) + 1;

  let allAnswers = [];
  let switchAnswers = [];

  answer = number1 + number2;
  console.log(number1, number2);
  document.querySelector(".number1").innerHTML = number1;
  document.querySelector(".number2").innerHTML = number2;

  allAnswers = [answer, answer1, answer2];

  // ! mai trebuie sa adaug verificare ca rezultat sa nu fie la fel !
  for (i = allAnswers.length; i--; ) {
    switchAnswers.push(
      allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]
    );
  }

  option1.innerHTML = switchAnswers[0];
  option2.innerHTML = switchAnswers[1];
  option3.innerHTML = switchAnswers[2];
}

document.querySelectorAll(".option").forEach((option) => {
  option.addEventListener("click", (event) => {
    if (event.target.textContent == answer) {
      generateEquation();
    } else {
      tryAgainAudio.play();
    }
  });
});

generateEquation();