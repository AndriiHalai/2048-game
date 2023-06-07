"use strict";

let board;
let score = 0;
const ROWS = 4;
const COLUMNS = 4;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();
      let num = board[i][j];
      updateTile(tile, num);
      document.getElementById("game-board").append(tile);
    }
  }
  addTile();
  addTile();
}

function addTile() {
  if (!hasZero()) {
    showRestartPopup();
    return;
  }
  let flag = false;
  while (!flag) {
      let row = Math.floor(Math.random() * ROWS);
      let column = Math.floor(Math.random() * COLUMNS);
      if (board[row][column] == 0) {
          board[row][column] = 2;
          let tile = document.getElementById(row.toString() + "-" + column.toString());
          tile.innerText = "2";
          tile.classList.add("x2");
          flag = true;
      }
  }
}

function showRestartPopup() {
  const popup = document.createElement("div");
  const text = document.createElement("h3");
  const restartButton = document.createElement("button");

  popup.classList.add("popup");
  restartButton.id = "restart-button";
  text.innerText = "Game over";
  restartButton.innerText = "Restart";
  popup.append(text);
  popup.append(restartButton);
  document.getElementById("game-board").append(popup);

  restartButton.addEventListener("click", () => {
    window.location.reload();
  });
}

function hasZero() {
  for (let row = 0; row < ROWS; row++) {
      for (let column = 0; column < COLUMNS; column++) {
          if (board[row][column] == 0) {
              return true;
          }
      }
  }
  return false;
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = ""; 
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num.toString();
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "ArrowLeft":
      slideLeft();
      addTile();
      break;
    case "ArrowRight":
      slideRight();
      addTile();
      break;
    case "ArrowUp":
      slideUp();
      addTile();
      break;
    case "ArrowDown":
      slideDown();
      addTile();
      break;
  }
  document.getElementById("score").innerText = score.toString();
});

function filterZero(row) {
  return row.filter(num => num !== 0);
}

function slide(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length-1; i++) {
    if (row[i] == row[i+1]) {
      row[i] *= 2;
      row[i+1] = 0;
      score += row[i];
    }
  }
  row = filterZero(row);

  while(row.length < COLUMNS) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let i = 0; i < ROWS; i++) {
    let row = board[i];
    row = slide(row);
    board[i] = row;

    for (let j = 0; j < COLUMNS; j++) {
      let tile = document.getElementById(i.toString() + "-" + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let i = 0; i < ROWS; i++) {
    let row = board[i];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[i] = row;

    for (let j = 0; j < COLUMNS; j++) {
      let tile = document.getElementById(i.toString() + "-" + j.toString());
      let num = board[i][j];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let i = 0; i < COLUMNS; i++) {
    let row = [];
    for (let j = 0; j < ROWS; j++) {
      row.push(board[j][i]);
    }
    row = slide(row);
    for (let j = 0; j < ROWS; j++) {
      board[j][i] = row[j];
      let tile = document.getElementById(j.toString() + "-" + i.toString());
      let num = board[j][i];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let i = 0; i < COLUMNS; i++) {
    let row = [];
    for (let j = 0; j < ROWS; j++) {
      row.push(board[j][i]);
    }
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let j = 0; j < ROWS; j++) {
      board[j][i] = row[j];
      let tile = document.getElementById(j.toString() + "-" + i.toString());
      let num = board[j][i];
      updateTile(tile, num);
    }
  }
}
