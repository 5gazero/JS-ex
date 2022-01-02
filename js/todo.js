const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = []; // update 가능

const saveToDos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // 객체나 배열을 string으로
};

const deleteToDo = (event) => {
  // click에 대한 event
  const li = event.target.parentElement; // 클릭 된 element의 부모
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id)); // typeof li.id === string
  saveToDos();
};

const paintToDo = (newTodo) => {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "🗑";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
};

const handleToDoSubmit = (event) => {
  event.preventDefault(); // 기본동작 제어
  const newTodo = toDoInput.value; // input으로 받은 값 변수에 할당
  toDoInput.value = ""; // input창 초기화
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj); // newTodoObj를 arr에 push
  paintToDo(newTodoObj); // 화면에 newTodo 보여주기
  saveToDos(); // arr를 localStorage에 저장
};

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos); // string을 배열로
  toDos = [...parsedToDos]; // 기존에 저장된 toDos 할당
  parsedToDos.forEach(paintToDo);
}
