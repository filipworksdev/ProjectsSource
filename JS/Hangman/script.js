
const buttons = document.querySelector("#buttons")
const tries = document.querySelector("#tries")
const wordbox = document.querySelector("#wordbox")
const letters = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",")
const words = ["boxcar", "stymied", "gnostic", "gossip", "dizzy", "blizzard", "wristwatch", "jelly", "gizmo", "daiquiri", "zilch", "fuzz"]

const word = words[Math.floor(Math.random() * words.length)] // the actual word

for (let letter of word) {
  wordbox.innerText = wordbox.innerText + " _"
}

// game variables
var guessed = []
var wrong = 0 // how many letters we get wrong

tries.innerText = "You have 10 tries"

for (let i = 0; i < letters.length; i++) {
  var li = document.createElement("li")
  li.textContent = letters[i]
  li.onclick = function() {
    if (wrong == 10) return
    
    if (this.getAttribute("class") == "disabled") {
      return
    }
    if (word.indexOf(letters[i]) != -1) {
      guessed.push(letters[i])
      // rebuild the word
      let word2 = ""
      for (let letter of word) {
        if (guessed.indexOf(letter) != -1) {
          word2 = word2 + letter + " "
        } else {
          word2 = word2 + "_ "
        }
      }
      wordbox.textContent = word2
      checkWin(word2)
    } else {
      wrong = wrong + 1
      tries.textContent =  "You have " + (10-wrong) + " tries"
      drawHangman()
    }
    checkLose()
    this.setAttribute("class", "disabled")
  }
  buttons.append(li)
}

function checkWin(w) {
  if (w.indexOf("_") == -1) {
    tries.textContent = "You got it!"
    return
  }
}

function checkLose() {
  if (wrong >= 10) {
    tries.innerHTML = "Game Over! <a href='javascript:history.go(0)'>Restart</a>?"
  }
}


const hangman = document.querySelector("#hangman")
const ctx = hangman.getContext("2d")

// TODO draw the hangman
function drawHangman() {
  if (wrong == 1) { //draw base
    ctx.beginPath()
    ctx.moveTo(0,180)
    ctx.lineTo(100,180)
    ctx.stroke()
  }

  if (wrong == 2) {  //vertical bar
    ctx.beginPath()
    ctx.moveTo(50,180)
    ctx.lineTo(50,20)
    ctx.stroke()
  }

  if (wrong == 3) { //horizontal bar
    ctx.beginPath()
    ctx.moveTo(50,20)
    ctx.lineTo(120,20)
    ctx.stroke()
  }

  if (wrong == 4) { //noose
    ctx.beginPath()
    ctx.moveTo(120,20)
    ctx.lineTo(120,40)
    ctx.stroke()
  }

  if (wrong == 5) {  //head
    ctx.beginPath()
    ctx.arc(120, 55, 15, 0, Math.PI * 2, false)
    ctx.stroke()
  }

  if (wrong == 6) { // body
    ctx.beginPath()
    ctx.moveTo(120,70)
    ctx.lineTo(120,120)
    ctx.stroke()
  }

  if (wrong == 7) { // l arm
    ctx.beginPath()
    ctx.moveTo(120,80)
    ctx.lineTo(100,100)
    ctx.stroke()
  }
  
  if (wrong == 8) { // r arm
    ctx.beginPath()
    ctx.moveTo(120,80)
    ctx.lineTo(140,100)
    ctx.stroke()
  }


  if (wrong == 9) { // l leg
    ctx.beginPath()
    ctx.moveTo(120,120)
    ctx.lineTo(100,140)
    ctx.stroke()
  }
  
  if (wrong == 10) { // r leg
    ctx.beginPath()
    ctx.moveTo(120,120)
    ctx.lineTo(140,140)
    ctx.stroke()
  }
}




