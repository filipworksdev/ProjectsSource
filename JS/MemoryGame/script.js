var slots = Object.values(document.querySelectorAll(".slot"))
var hiddenSlots = []
var hiddenSlotsIndexes = []
var symbols = ["🏆", "📯", "🏀","👑", "⚽", "🪁"]
var target = null
var timeout1
var timeout2

for(let i = 0; i < slots.length; i++) {
  slots[i].onmousedown = function(event) {
    event.preventDefault() // prevent default select/drag behavior
  }

  slots[i].onclick = function(event) {
    if (event.target.getAttribute("class") == "slot done") {
      return
    }

    if (target == event.target) {
      return
    }
    
    if (target == null) {
      event.target.innerText = hiddenSlots[i]
      target = event.target
    } else {
      event.target.innerText = hiddenSlots[i]
      if (target.innerText != event.target.innerText) {
        timeout1 = setInterval(function() {
          clearSymbol(event.target)
          clearTimeout(timeout1)
        }, 500)
        timeout2 = setInterval(function() {
          clearSymbol(target)
          clearTimeout(timeout2)
          target = null
        }, 500)
      } else {
        target.setAttribute("class", "slot done")
        event.target.setAttribute("class", "slot done")
        target = null
      }
    }
  }

  hiddenSlots.push("x")
  hiddenSlotsIndexes.push(hiddenSlots.length-1)
}

function clearSymbol(t) {
  t.innerText = "⭐"
}
 
// generate symbol location
for (symbol of symbols) {
  // symbol 1
  var index = Math.floor(Math.random() * hiddenSlotsIndexes.length)
  var hindex = hiddenSlotsIndexes[index]
  hiddenSlots[hindex] = symbol
  hiddenSlotsIndexes.splice(index, 1)

  // symbol 1 matching pair
  var index = Math.floor(Math.random() * hiddenSlotsIndexes.length)
  var hindex = hiddenSlotsIndexes[index]
  hiddenSlots[hindex] = symbol
  hiddenSlotsIndexes.splice(index, 1)
}

