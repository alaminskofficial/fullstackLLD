function attachBoardListeners(board) {
    const taskInput = board.querySelector(".task-input");
    const taskButton = board.querySelector(".task-button");
    const taskContainer = board.querySelector(".tasks-container");

    taskButton.addEventListener("click", () => {
        const value = taskInput.value.trim();
        if (value) {
            const task = document.createElement("p");
            task.className = "task";
            task.setAttribute("draggable", "true");
            task.innerText = value;
            attachDragListener(task);
            taskContainer.appendChild(task);
            taskInput.value = "";
            saveToLocalStorage();
        }
    });

    taskContainer.querySelectorAll(".task").forEach(task => attachDragListener(task));

    board.addEventListener("dragover", (e) => {
        e.preventDefault();
        const task = document.querySelector(".is-dragging");
        const closestElement = getTheClosestElement(board, e.clientY);
        if (closestElement) {
            taskContainer.insertBefore(task, closestElement);
        } else {
            taskContainer.appendChild(task);
        }
    });
}

const getTheClosestElement = (board, yAxis) => {
    const tasksInThisBoard = board.querySelectorAll(".task:not(.is-dragging):not(.input-container)");

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