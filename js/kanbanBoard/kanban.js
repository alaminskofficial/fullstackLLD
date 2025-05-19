const tasks = document.querySelectorAll(".task");
const boards = document.querySelectorAll(".board");

tasks.forEach((task) => attachDragListner(task));

boards.forEach((board) => {
  board.addEventListener("dragover", (e) => {
    const task = document.querySelector(".is-dragging");

    const closestElement = getTheClosestElement(board, e.clientY);

    if (closestElement) {
      board.insertBefore(task, closestElement);
    } else {
      // Add at the end
      board.appendChild(task);
    }
  });
});

const getTheClosestElement = (board, yAxis) => {
  const tasksInThisBoard = board.querySelectorAll(".task:not(.is-dragging)");

  let closestElement = null;
  let closestDistance = Number.NEGATIVE_INFINITY;

  tasksInThisBoard.forEach((task) => {
    const boundry = task.getBoundingClientRect();
    const top = boundry.top;

    const distance = yAxis - top;

    if (distance < 0 && distance > closestDistance) {
      closestDistance = distance;
      closestElement = task;
    }
  });

  return closestElement;
};