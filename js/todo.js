const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const toDos = [];

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
  // click에 대한 event
  const li = event.target.parentElement; // 클릭 된 element의 부모
  li.remove();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = newTodo;
  const button = document.createElement("button");
  button.innerText = "🗑";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault(); // 기본동작 제어
  const newTodo = toDoInput.value; // input으로 받은 값 변수에 할당
  toDoInput.value = ""; // input창 초기화
  toDos.push(newTodo); // newTodo를 arr에 push
  paintToDo(newTodo); // 화면에 newTodo 보여주기
  saveToDos(); // arr를 localStorage에 저장
}

toDoForm.addEventListener("submit", handleToDoSubmit);
