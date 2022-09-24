// board layout
// 0 1 2
// 3 4 5
// 6 7 8

// HTML elements
const modal = document.querySelector(".modal")
const modal_content = document.querySelector(".modal-content")
const board = document.querySelectorAll(".cell")

// variables
const symbols = ["X", "O"]
var current_player = randomPlayer()
var win = ""

function randomPlayer() {
  return symbols[Math.floor(Math.random()*2)]
}

for(let i = 0; i < 9; i++) {
  board[i].onclick = function() {
    if (win == "") {
      if (this.innerText == "") {
        if (current_player == "O") {
          this.style.color = "blue"
        } else if (current_player == "X") {
          this.style.color = "red"
        }
        this.innerText = current_player
        checkWin()
        swapPlayer()
      } else {
        alert("Slot " + (i+1) + " is already taken!")
      }
    }
  }
}

function swapPlayer() {
  if (current_player == "X") {
    current_player = "O"
  } else {
    current_player = "X"
  }
}

function checkWin() {
  if (check3(board[0].innerText, board[1].innerText, board[2].innerText)) {
    if (board[0].innerText != "") {
      win = current_player
    }
  }
  if (check3(board[3].innerText, board[4].innerText, board[5].innerText)) {
    if (board[3].innerText != "") {
      win = current_player
    }
  } 
  if (check3(board[6].innerText, board[7].innerText, board[8].innerText)) {
    if (board[6].innerText != "") {
      win = current_player
    }
  } 
  if (check3(board[0].innerText, board[4].innerText, board[8].innerText)) {
    if (board[0].innerText != "") {
      win = current_player
    }
  } 
  if (check3(board[6].innerText, board[4].innerText, board[2].innerText)) {
    if (board[6].innerText != "") {
      win = current_player
    }
  } 
  if (check3(board[0].innerText, board[3].innerText, board[6].innerText)) {
    if (board[0].innerText != "") {
      win = current_player
    }
  } 
  if (check3(board[1].innerText, board[4].innerText, board[7].innerText)) {
    if (board[1].innerText != "") {
      win = current_player
    }
  } 
  if (check3(board[2].innerText, board[5].innerText, board[8].innerText)) {
    if (board[2].innerText != "") {
      win = current_player
    }
  }
  
  if (win != "") {
    modal.style.display = "block"
    modal_content.innerHTML = "<h1>" + current_player + " Won!</h1>"
  }
}

// a == b == c
function check3(a,b,c) {
  if (a == b && b == c) {
    return true
  }
  return false
}

function newGame() {
  for(let i = 0; i < 9; i++) {
    board[i].innerText = ""
    modal.style.display = "none"
    win = ""
    current_player = randomPlayer()
  }
}