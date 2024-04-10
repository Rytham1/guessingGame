// QuerySelector picks the element with the class

const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeValue = document.getElementById("time-value");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const streakDisplay = document.querySelector(".streak-count"); // Get the streak count span element
const body = document.querySelector('body');


// global vars
let timer;
let correctWord;
let streakCount = 0;



// Followed tutorial, but you basically set the timer, remove one from timer until it is less than 0.
const initTimer = maxTime => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      timeValue.innerText = maxTime;
    } else {
      clearInterval(timer);
      alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
      initGame();
    }
  }, 1000);
};


// R
const initGame = () => {

  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  // Display this text (innerText) assigns the stuff from wordsdata and makes it appear on screen
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  // lowercase to make sure it doesn't matter if the user types in caps or not
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  //don't let user entre more chars than char length of the word
  inputField.setAttribute("maxlength", correctWord.length);
  initTimer(45);
};

// Change the background color based on the streak count
const updateBackgroundColor = () => {
    const body = document.querySelector('body');
    if (streakCount < 3) {
      body.style.background = '#ff0000'; // Red
    } else if (streakCount >= 3 && streakCount <= 6) {
      body.style.background = '#ffff00'; // Yellow
    } else {
      body.style.background = '#00ff00'; // Green
    }
  };
  
// Call this in the beginning
updateBackgroundColor(); 


const incrementStreak = () => {
  streakCount++;
  streakDisplay.innerText = `Streak: ${streakCount}`; // Update the streak count in the HTML
};

const resetStreak = () => {
  streakCount = 0;
  streakDisplay.innerText = `Streak: ${streakCount}`; // Reset the streak count in the HTML
};


// check word,
const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) {
    alert("Please enter the word to check!");
    updateBackgroundColor(); 
    return;
  }
  if (userWord !== correctWord) {
    alert(`Oops! ${userWord} is not the correct word`);
    resetStreak(); // Reset streak if the word is incorrect
  } else {
    clearInterval(timer);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
    incrementStreak(); // Increment streak if the word is correct
    updateBackgroundColor(); 
  }
};

// Listen if these btns are clicked
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

// Call initGame to start the game initially
initGame();
