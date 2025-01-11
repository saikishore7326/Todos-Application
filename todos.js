const todoUserInput = document.getElementById("todoUserInput");
const addTodoButton = document.getElementById("addTodoButton");
const todoItemsContainer = document.getElementById("todoItemsContainer");
const saveTodoButton = document.getElementById("saveTodoButton");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let todosCount = todoList.length;

saveTodoButton.onclick = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

addTodoButton.onclick = () => {
  const userInputValue = todoUserInput.value.trim();

  if (userInputValue === "") {
    alert("Enter a valid task.");
    return;
  }

  const newTodo = {
    text: userInputValue,
    uniqueNo: ++todosCount,
    isChecked: false
  };

  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  todoUserInput.value = "";
};

const createAndAppendTodo = (todo) => {
  const todoElement = document.createElement("li");
  todoElement.className = "todo-item-container";
  todoElement.id = `todo${todo.uniqueNo}`;

  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.className = "checkbox-input";
  inputElement.checked = todo.isChecked;
  inputElement.addEventListener("change", () => {
    todo.isChecked = !todo.isChecked;
    saveTodoList();
    labelElement.classList.toggle("checked");
  });

  const labelElement = document.createElement("label");
  labelElement.textContent = todo.text;
  labelElement.className = "checkbox-label";
  if (todo.isChecked) labelElement.classList.add("checked");

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.className = "remove-button";
  removeButton.addEventListener("click", () => {
    todoItemsContainer.removeChild(todoElement);
    todoList = todoList.filter((item) => item.uniqueNo !== todo.uniqueNo);
    saveTodoList();
  });

  const labelContainer = document.createElement("div");
  labelContainer.className = "label-container";
  labelContainer.append(labelElement, removeButton);

  todoElement.append(inputElement, labelContainer);
  todoItemsContainer.appendChild(todoElement);
};

const saveTodoList = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

todoList.forEach(createAndAppendTodo);
