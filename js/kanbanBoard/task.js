const btn = document.getElementById("task-button");
const inputField = document.getElementById("task-input");
const todoContainer = document.getElementById("todo-board");

btn.addEventListener("click", (e) => {
  const value = inputField.value;

  if (value.trim()) {
    const p = document.createElement("p");
    p.setAttribute("draggable", "true");
    p.classList.add("task");
    p.innerText = value;

    attachDragListner(p);

    todoContainer.appendChild(p);
  }

  inputField.value = "";
});