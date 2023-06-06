"use strict";

let board;
let score = 0;
let ROWS = 4;
let COLUMNS = 4;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [2, 2, 2, 2],
    [2, 2, 2, 2],
    [4, 4, 8, 8],
    [4, 4, 8, 8],
  ];

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLUMNS; j++) {
      let tile = document.createElement("div");
      tile.id = i.toString() + "-" + j.toString();
      let num = board[i][j];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
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
  // if (e.code == "ArrowLeft") {
  //   slideLeft();
  // }
  switch (e.code) {
    case "ArrowLeft":
      slideLeft();
      break;
    case "ArrowRight":
      slideRight();
      break;
    case "ArrowUp":
      slideUp();
      break;
    case "ArrowDown":
      slideDown();
      break;
  }
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
