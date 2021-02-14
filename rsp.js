const userName = document.querySelector(".user-name");
const rivalName = document.querySelector(".rival-name");
const userImg = document.querySelector(".user-image");
const rivalImg = document.querySelector(".rival-image");
const rockBtn = document.querySelector(".rock-btn");
const scissorBtn = document.querySelector(".scissor-btn");
const paperBtn = document.querySelector(".paper-btn");
const startBtn = document.querySelector(".start-btn");
const resultBoard = document.querySelector(".result");
const userRunner = document.querySelector(".user-runner");
const rivalRunner = document.querySelector(".rival-runner");

let user, rival; // user와 rival의 (가위 바위 보)
let interval; // 가위바위보 반복
let startFlag = false; // 시작 버튼 중복 방지 flag
let btnFlag = false; // 가위바위보 버튼 중복 방지 flag
let userScore = 0; // Lion 승리 횟수
let rivalScore = 0; // Neo 승리 횟수

/**
 *****************
 가위바위보 초기화
 *****************
 */
function init() {
  user = "";
  rival = "";
  resultBoard.textContent = "";
  userImg.className = "";
  rivalImg.className = "";
  // 기본 이미지 세팅
  userImg.classList.add("image", "user-image");
  rivalImg.classList.add("image", "rival-image");
}

/** 
*****************************
시작 버튼 클릭 시 random 반복
*****************************
*/
startBtn.addEventListener("click", function () {
  if (startFlag || btnFlag) return;
  randomRSP();
});

function randomRSP() {
  startFlag = true;

  // Neo -> rock
  rivalImg.classList.remove("rival-image");
  rivalImg.classList.add("rock-image");

  // rock -> scissor -> paper 반복
  interval = setInterval(function () {
    if (rival === "rock" || !rival) {
      rivalImg.classList.replace("rock-image", "scissor-image");
      rival = "scissor";
    } else if (rival === "scissor") {
      rivalImg.classList.replace("scissor-image", "paper-image");
      rival = "paper";
    } else if (rival === "paper") {
      rivalImg.classList.replace("paper-image", "rock-image");
      rival = "rock";
    }
  }, 100);
}

/** 
*****************************
가위 바위 보 버튼 클릭 이벤트
*****************************
*/
rockBtn.addEventListener("click", function () {
  if (!startFlag || btnFlag) return;
  clearTimeout(interval);
  btnFlag = true;
  user = "rock";
  userImg.classList.replace("user-image", "rock-image");
  checkWinner(user);
});
scissorBtn.addEventListener("click", function () {
  if (!startFlag || btnFlag) return;
  clearTimeout(interval);
  btnFlag = true;
  user = "scissor";
  userImg.classList.replace("user-image", "scissor-image");
  checkWinner(user);
});
paperBtn.addEventListener("click", function () {
  if (!startFlag || btnFlag) return;
  clearTimeout(interval);
  btnFlag = true;
  user = "paper";
  userImg.classList.replace("user-image", "paper-image");
  checkWinner(user);
});

/**
 ********************
 가위바위보 결과 체크
 ********************
  */
function checkWinner(user) {
  console.log(startFlag, btnFlag);
  if (user === rival) {
    resultBoard.textContent = " 무승부";
    setTimeout(function () {
      init();
      startFlag = false;
      btnFlag = false;
    }, 1000);
    return;
  }
  if (user === "rock") {
    if (rival === "scissor") {
      resultBoard.textContent = " 승리!!!";
      moveRace(0);
    } else {
      resultBoard.textContent = " 패배 ;(";
      moveRace(1);
    }
  }
  if (user === "scissor") {
    if (rival === "paper") {
      resultBoard.textContent = " 승리!!!";
      moveRace(0);
    } else {
      resultBoard.textContent = " 패배 ;(";
      moveRace(1);
    }
  }
  if (user === "paper") {
    if (rival === "rock") {
      resultBoard.textContent = " 승리!!!";
      moveRace(0);
    } else {
      resultBoard.textContent = " 패배 ;(";
      moveRace(1);
    }
  }
  setTimeout(function () {
    init();
    startFlag = false;
    btnFlag = false;
  }, 1000);
}

/**
 *****************************
 가위바위보 승리시 runner 이동
 *****************************
 */
function moveRace(winner) {
  console.log(winner);
  if (winner === 0) {
    console.log("라이언");
    userScore++;
    console.log(userScore);
    switch (userScore) {
      case 1:
        userRunner.classList.add("user-win-1");
        break;
      case 2:
        userRunner.classList.replace("user-win-1", "user-win-2");
        break;
      case 3:
        userRunner.classList.replace("user-win-2", "final-win");
        break;
    }
  } else if (winner === 1) {
    console.log("네오");
    rivalScore++;
    console.log(rivalScore);
    switch (rivalScore) {
      case 1:
        rivalRunner.classList.add("rival-win-1");
        break;
      case 2:
        rivalRunner.classList.replace("rival-win-1", "rival-win-2");
        break;
      case 3:
        rivalRunner.classList.replace("rival-win-2", "final-win");
        break;
    }
  }

  if (userScore === 3) {
    resultBoard.textContent = "";
    userName.textContent = "라이언 승리!!";
    rivalName.textContent = "네오 패배 ;(";
    initRace();
  } else if (rivalScore === 3) {
    resultBoard.textContent = "";
    rivalName.textContent = "네오 승리!!";
    userName.textContent = "라이언 패배 ;(";
    initRace();
  }
}

/**
 ***********************
 Race 최종 승리시 초기화
 ***********************
 */
function initRace() {
  setTimeout(function () {
    userRunner.className = "runner";
    userRunner.classList.add("user-runner");
    rivalRunner.className = "runner";
    rivalRunner.classList.add("rival-runner");
    userScore = 0;
    rivalScore = 0;
    userName.textContent = "라이언";
    rivalName.textContent = "네오";
  }, 2000);
}
