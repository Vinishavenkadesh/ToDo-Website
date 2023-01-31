//SELECTOR
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".todo-filter");
//EVENT LISTENER
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", checkingInputBeforeAddingTodo);
todoList.addEventListener("click", deleteCheck);
filterTodo.addEventListener("click", filterOption);
//FUNCTION

function checkingInputBeforeAddingTodo(e) {
  e.preventDefault();
  if (!todoInput.value == "") {
    addTodo(e);
  }
}
function addTodo(event) {
  //PREVENTING DEFAULT FROM FORM
  event.preventDefault();
  //CREATING DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  //CREATING LIST
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  saveLocalTodos(todoInput.value);

  //COMPLETED BTN
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);

  //TRASH BTN
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  //CLEARING INNER VALUE OF TODO INPUT
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo)
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterOption(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem("todos")=== null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos));
} 

function getTodos(){
  let todos;
  if(localStorage.getItem("todos")=== null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
todos.forEach(function(todo){
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  //CREATING LIST
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //COMPLETED BTN
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);

  //TRASH BTN
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
})
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")=== null){
      todos = [];
    }
    else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}
