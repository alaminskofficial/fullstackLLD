function saveToLocalStorage() {
    const data = [];
    document.querySelectorAll(".board").forEach(board => {
      const title = board.querySelector("h3").innerText;
      const tasks = Array.from(board.querySelectorAll(".task")).map(t => t.innerText);
      data.push({ title, tasks });
    });
    localStorage.setItem("kanbanBoards", JSON.stringify(data));
  }

  function loadFromLocalStorage() {
    const defaultBoards = [
        { title: "Todo", tasks: ["delete tasks ", "Misc tasks"] },
        { title: "In Progress", tasks: ["closestElement logic"] },
        { title: "Done", tasks: ["Add Task w.r.t board", "saved in local storage" ,"add board dynamically"] }
      ];
    const data = JSON.parse(localStorage.getItem("kanbanBoards")) || defaultBoards;
    data.forEach(board => createBoard(board.title, board.tasks));
  }

  loadFromLocalStorage();//initial load of boards