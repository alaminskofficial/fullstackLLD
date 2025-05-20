  function attachDragListener(task) {
    if(!task) return;
    task.addEventListener("dragstart", () => task.classList.add("is-dragging"));
    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
      saveToLocalStorage();//it helps to save the data in local storage when dragend
    });
  }
  