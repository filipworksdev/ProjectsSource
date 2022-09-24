const todo_items_left = document.querySelector("#todo-items-left")
const todo_list = document.querySelector("#todo-list")
const text_input = document.querySelector("#text")

var entries = []
var count = 0
// try to load entries from storage
var stored_entries = localStorage.getItem("entries")
if (stored_entries) {
  // if entries exist in storage load them in
  entries = JSON.parse(stored_entries)
  console.log(entries)
  count = entries.length
  update_items_left(0)

  console.log(count)

  // re-create all the entries in HTML
  for (var i = 0; i < count; i++) {
    create_todo(entries[i])
  }
} else {
  localStorage.setItem("entries", JSON.stringify(entries))
}

function update_stored_entries(in_text = "") {
  if (in_text) {
    entries.push(in_text)
  }
  localStorage.setItem("entries", JSON.stringify(entries))
}

function hide_completed(hide) {
  tableList = todo_list.children
  for (var i = 0; i < tableList.length; i++) {
    if (hide && tableList[i].children[0].checked){
      tableList[i].style.display = "none"
    } else {
      tableList[i].style.display = "flex"
    }
  }
}

// update You have x items left count in HTML
function update_items_left(c) {
  count += c
  var plural = count == 1 ? "" : "s"
  todo_items_left.innerText = "You have " + count + " item" + plural + " left"
}

//add a new HTML entry
function create_todo(in_text) {
  const todo_item = document.createElement("div")
  todo_item.setAttribute("class", "todo-item")

  const checkbox = document.createElement("input")
  checkbox.setAttribute("type", "checkbox")
  checkbox.onclick = function() {
    if (this.checked) {
      update_items_left(-1)
    } else {
      update_items_left(1)
    }
  }

  const text = document.createElement("span")
  text.innerText = in_text
  text_input.value = ""

  const button_delete = document.createElement("input")
  button_delete.setAttribute("type", "button")
  button_delete.setAttribute("value", "Delete")
  button_delete.setAttribute("class", "button-delete")
  button_delete.onclick = function() {
    var c = checkbox 
    for (var i = 0; i < todo_list.children.length; i++) {
      if (todo_list.children[i] == this.parentElement) {
        entries.splice(i, 1)
        break
      }
    }
    todo_list.removeChild(this.parentElement)
    if (c.checked == false) {
      update_items_left(-1)
    }
    update_stored_entries() 
  }

  todo_item.appendChild(checkbox)
  todo_item.appendChild(text)
  todo_item.appendChild(button_delete)

  todo_list.appendChild(todo_item)
}

function add_todo(){
  var entry_text = text_input.value 

  create_todo(entry_text)

  // add 1 to count and 
  update_stored_entries(entry_text)
  update_items_left(1)
}