function attachBoardListeners(board) {
    const taskInput = board.querySelector(".task-input");
    const taskButton = board.querySelector(".task-button");
    const taskContainer = board.querySelector(".tasks-container");

    taskButton.addEventListener("click", () => {
        const value = taskInput.value.trim();
        if (value) {
            const wrapper = document.createElement("div");
            wrapper.className = "task-wrapper";
            const task = document.createElement("p");
            task.className = "task";
            task.setAttribute("draggable", "true");
            task.innerText = value;
            const removeBtn = document.createElement("button");
            removeBtn.className = "remove-task-button";
            removeBtn.innerText = "x";
            removeBtn.addEventListener("click", () => {
                wrapper.remove();
                saveToLocalStorage();
            });
            attachDragListener(task);
            wrapper.appendChild(task);
            wrapper.appendChild(removeBtn);
            taskContainer.appendChild(wrapper);
            taskInput.value = "";
            saveToLocalStorage();
        }
    });

    taskContainer.querySelectorAll(".task-wrapper").forEach(task => attachDragListener(task));

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
    // Remove board button
    board.querySelector(".remove-board-button").addEventListener("click", () => {
        board.remove();
        saveToLocalStorage();
    });
    // Remove individual task buttons
    board.querySelectorAll(".remove-task-button").forEach(button => {
        button.addEventListener("click", (e) => {
            e.target.closest(".task-wrapper").remove();
            saveToLocalStorage();
        });
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