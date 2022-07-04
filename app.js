//selectors
let todoInput = document.querySelector(".todo_input");
let todobtn = document.querySelector(".todo_btn");
let todolist = document.querySelector(".todo_list");
let filterTodoOption = document.querySelector(".filter-todo");


// event listeners

document.addEventListener("DOMContentLoaded", getTodos);
todobtn.addEventListener("click", addTodo);
todolist.addEventListener("click", deleteCheck);
filterTodoOption.addEventListener("change", filterTodo);


//functions

function addTodo(event){
  //Prevent form from submitting
  event.preventDefault();
  //ToDo DIV
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if (todoInput.value) {
    //Create LI
    let newTodo = document.createElement("li");
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // ADD todo to LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //check mark btn
    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = " <i class='fas fa-check' ></i> "
    completeBtn.classList.add("complete_btn");
    todoDiv.appendChild(completeBtn);
    //check trash btn
    let trashBtn = document.createElement("button");
    trashBtn.innerHTML = " <i class='fas fa-trash' ></i> "
    trashBtn.classList.add("trash_btn");
    todoDiv.appendChild(trashBtn);
    //Append to list
    todolist.appendChild(todoDiv);
    //CLEAR todoInput value
    todoInput.value= "";
  }

}

function deleteCheck(e) {

  let item = e.target;

  //Delete TODO
  if (item.classList.contains("trash_btn")  ){
    let todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    })
  }
  //cheak mark
  if (item.classList.contains("complete_btn")){
    let todo = item.parentElement;
    todo.classList.toggle("completed");
  }

}

//filtering

function filterTodo(e) {
  let todos = todolist.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
          todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
        }else {
            todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
        }else {
            todo.style.display = "none";
          }
      break;

    }
  });

}

//Local Storage
function saveLocalTodos(todo) {
  let todos;
  //CHEAK--- hay do I have thing in there?
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  //CHEAK--- hay do I have thing in there?
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo) {
    //ToDo DIV
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
      //Create LI
      let newTodo = document.createElement("li");
      newTodo.innerHTML = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      //check mark btn
      let completeBtn = document.createElement("button");
      completeBtn.innerHTML = " <i class='fas fa-check' ></i> "
      completeBtn.classList.add("complete_btn");
      todoDiv.appendChild(completeBtn);
      //check trash btn
      let trashBtn = document.createElement("button");
      trashBtn.innerHTML = " <i class='fas fa-trash' ></i> "
      trashBtn.classList.add("trash_btn");
      todoDiv.appendChild(trashBtn);
      //Append to list
      todolist.appendChild(todoDiv);
  })
}


function removeLocalTodo(todo) {
  let todos;
  //CHEAK--- hay do I have thing in there?
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}






;
