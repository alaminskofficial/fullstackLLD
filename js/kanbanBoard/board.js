const boardContainer = document.getElementById("board-container");
const addBoardButton = document.getElementById("add-board-button");

addBoardButton.addEventListener("click", () => {
    const name = prompt("Enter board name");
    if (name) {
      createBoard(name);
      saveToLocalStorage();
    }
  });

  function createBoard(title, tasks = []) {
    const board = document.createElement("div");
    board.className = "board";

    board.innerHTML = `
      <h3>${title}</h3>
      <div class="tasks-container">
        ${tasks.map(task => `<p class="task" draggable="true">${task}</p>`).join("")}
      </div>
      <div class="input-container">
        <input placeholder="Add Task" class="task-input" />
        <button class="task-button"><i class="fas fa-plus"></i></button>
      </div>
    `;

    attachBoardListeners(board);
    boardContainer.appendChild(board);
  }