document.addEventListener("DOMContentLoaded", () => {
  const outputDiv = document.getElementById("output");
  const guessInput = document.getElementById("guess");
  const submitBtn = document.getElementById("submitBtn");
  const incrementBtn = document.getElementById("increment");
  const decrementBtn = document.getElementById("decrement");
  const replayDiv = document.getElementById("replayConfirmation");
  const replayYes = document.getElementById("replayYes");
  const replayNo = document.getElementById("replayNo");
  const bestScoreDiv = document.getElementById("bestScore");

  if (
    !outputDiv ||
    !(guessInput instanceof HTMLInputElement) ||
    !submitBtn ||
    !incrementBtn ||
    !decrementBtn ||
    !replayDiv ||
    !replayYes ||
    !replayNo ||
    !bestScoreDiv
  ) {
    console.error("One or more essential elements are missing in the DOM.");
    return;
  }

  //record
  let bestScore = localStorage.getItem("bestScore");
  let minAttempts = bestScore ? parseInt(bestScore, 10) : Infinity;
  bestScoreDiv.textContent = `Record de tentatives: ${
    minAttempts === Infinity ? "Pas encore établi" : minAttempts
  }`;

  //fonction random

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let targetNumber = getRandomInt(0, 100);
  let attemptGuess = 0;

  incrementBtn.addEventListener("click", () => {
    let currentValue = parseInt(guessInput.value, 10);
    if (currentValue < 100) {
      guessInput.value = (currentValue + 1).toString();
    }
  });

  decrementBtn.addEventListener("click", () => {
    let currentValue = parseInt(guessInput.value, 10);
    if (currentValue > 0) {
      guessInput.value = (currentValue - 1).toString();
    }
  });

  //fonction qui defini la comparaison
  submitBtn.addEventListener("click", () => {
    const numberUser = parseInt(guessInput.value, 10);
    attemptGuess++;

    if (numberUser < 0 || numberUser > 100 || isNaN(numberUser)) {
      outputDiv.textContent =
        "S'il te plaît, choisis un nombre valide entre 0 et 100.";
      outputDiv.className = "textContent";
      return;
    }

    if (numberUser > targetNumber) {
      outputDiv.innerHTML =
        "Aïe Aïe Aïe ! trop grand, essaie encore. <br>Tentatives: " +
        attemptGuess +
        "<br> <img src='/img/ErrorTall.svg' alt='Error Image'> ";
      outputDiv.className = "error";
      return;
    }

    if (numberUser < targetNumber) {
      outputDiv.innerHTML =
        "Zute de flute ! trop petit, essaie encore. <br>Tentatives: " +
        attemptGuess +
        "<br> <img src='/img/ErrorSmall.svg' alt='Error Image'> ";
      outputDiv.className = "error";
      return;
    }

    if (numberUser === targetNumber) {
      outputDiv.innerHTML =
        "Incroyable !! tu as réussi en : " +
        attemptGuess +
        " tentatives.<br> <img src='/img/Success.svg' alt='Success'> ";
      if (attemptGuess < minAttempts) {
        minAttempts = attemptGuess;
        localStorage.setItem("bestScore", minAttempts.toString());
        bestScoreDiv.textContent = `Record de tentatives: ${minAttempts}`;
      }
      replayDiv.style.display = "block";
    }
  });

  replayYes.addEventListener("click", () => {
    targetNumber = getRandomInt(0, 100);
    attemptGuess = 0;
    outputDiv.textContent = "";
    guessInput.value = "0";
    replayDiv.style.display = "none";
  });

  replayNo.addEventListener("click", () => {
    outputDiv.textContent = "Merci à bientôt!";
    replayDiv.style.display = "none";
  });
});
