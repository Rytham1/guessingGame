const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");

let timer;
let correctWord;

const initTimer = maxTime => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      timeText.innerText = maxTime;
    } else {
      clearInterval(timer);
      alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
      initGame();
    }
  }, 1000);
};

const initGame = () => {
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
  initTimer(60); // Set initial time here (e.g., 60 seconds)
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) {
    alert("Please enter the word to check!");
    return;
  }
  if (userWord !== correctWord) {
    alert(`Oops! ${userWord} is not the correct word`);
  } else {
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
  }
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Call initGame to start the game initially
initGame();