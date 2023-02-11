const addTask = document.querySelector(".add-task");
let enterTask = document.querySelector(".enter-task");
let list = document.querySelector(".list");
let arrTask = [];

if (localStorage.getItem("tasks")) {
  arrTask = JSON.parse(localStorage.getItem("tasks"));
  createElement();
}

addTask.addEventListener("click", function () {
  enterTask.focus();
  let taskObj = {
    id: Date.now(),
    taskText: enterTask.value,
  };
  if(enterTask.value.trim() === ''){
    return
  }else{

    arrTask.push(taskObj);
    createElement();
    enterTask.value = "";
    localStorage.setItem("tasks", JSON.stringify(arrTask));
  }
});

function createElement() {
  let newTask = "";
  arrTask.forEach(function (item) {
    newTask += `<div class="new-task" id="${item.id}">
             <li class="item-task" >${item.taskText}</li>
             <button class="delete-task"></button>
          </div>`;
    list.innerHTML = newTask;
  });
}

list.addEventListener("click", function (e) {
  let index = arrTask.findIndex((i) => {
    if (i.id == e.target.parentNode.id) {
      return true;
    }
  });
  arrTask.splice(index, 1);
  if (e.target.tagName === "BUTTON") {
    e.target.parentNode.remove();
    localStorage.setItem("tasks", JSON.stringify(arrTask));
  }
});

if (arrTask.length === 0) {
  localStorage.removeItem("tasks");
}