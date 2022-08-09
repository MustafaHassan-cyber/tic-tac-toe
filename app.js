const board = document.getElementById("board");
const winner_announcer_div = document.getElementById("winner-announcer-div");
const boxes = Array.from(document.getElementsByClassName("boxes"));
const resetBtn = document.getElementsByClassName("reset")[0];
const newGameBtn = document.getElementsByClassName("newGame")[0];
const play_againBtn = document.getElementById("play-again");
const winner_announcer = document.getElementById("winner-announcer");

const money_counter = document.getElementById("money-counter");
const honor_counter = document.getElementById("honor-counter");
/*
        [0,1,2]
        [3,4,5]
        [6,7,8]
*/
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let winner = "";
let money = "💲";
let honor = "🎩"; //🗡🔪🩸🛡
let money_wins = 0;
let honor_wins = 0;
//sounds
let winSoundEffect = new Audio("./sound/win.wav");
let honorClick = new Audio("./sound/honor.wav");
let moneyClick = new Audio("./sound/money.wav");

let currentPlayer = "💲";
//main game function
function ticTacToe() {
  //check if there is no winner
  if (winner != "🎩" && winner != "💲") {
    //check if the box has not been used
    if (this.innerText == "") {
      // X's move
      if (currentPlayer === "💲") {
        //play money's click
        moneyClick.play();
        this.innerText = currentPlayer;
        currentPlayer = "🎩";
        // loop throug the win condtions arry
        for (let y = 0; y < winConditions.length; y++) {
          let cuurentBox = winConditions[y];
          let x = 0;
          // loop throug the win condtions' arrays' values
          for (let index = 0; index < cuurentBox.length; index++) {
            if (boxes[cuurentBox[index]].innerText == money) {
              x++;
            }
          }
          if (x == 3) {
            console.log("💲 won");
            money_wins++;
            money_counter.innerText = money_wins;
            winner = money;
          }
        }
      }
      //=================================================================== below lies honor
      // Y's move
      else if (currentPlayer === honor) {
        // play honor click audio
        honorClick.play();
        this.innerText = currentPlayer;
        currentPlayer = "💲";
        // loop throug the win condtions arry
        for (let y = 0; y < winConditions.length; y++) {
          let cuurentBox = winConditions[y];
          let o = 0;
          // loop throug the win condtions' arrays' values
          for (let index = 0; index < cuurentBox.length; index++) {
            if (boxes[cuurentBox[index]].innerText == honor) {
              o++;
            }
          }
          // if honor wins
          if (o == 3) {
            console.log("🎩 won");
            honor_wins++;
            honor_counter.innerText = honor_wins;
            winner = honor;
          }
        }
      }
    }
  }
  //check if some one won the game
  if (winner != "") {
    //play sound effect
    winSoundEffect.play();
    winner_announcer.innerText = `${winner} won`;
    winner_announcer_div.style.zIndex = 1;
    board.style.zIndex = -1;
  }
}

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", ticTacToe);
}
// rest function
function reset() {
  winner_announcer_div.style.zIndex = -1;
  board.style.zIndex = 1;
  boxes.forEach((box) => {
    box.innerText = "";
    winner = "";
  });
}
// play again btn
play_againBtn.addEventListener("click", reset);
// reset btn
resetBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", () => {
  currentPlayer = money;
});
// new game btn
newGameBtn.addEventListener("click", reset);
newGameBtn.addEventListener("click", () => {
  currentPlayer = money;
  money_wins = 0;
  honor_wins = 0;
  honor_wins = 0;
  money_wins = 0;
  honor_counter.innerText = 0;
  money_counter.innerText = 0;
});
