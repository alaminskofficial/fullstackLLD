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
        { title: "Todo", tasks: ["Misc tasks 1"] },
        { title: "In Progress", tasks: ["Misc tasks 2"] },
        { title: "Done", tasks: ["Add , Delete Task w.r.t board", "saved in local storage" ,"add ,delete board dynamically"] }
      ];
    const data = JSON.parse(localStorage.getItem("kanbanBoards")) || defaultBoards;
    data.forEach(board => createBoard(board.title, board.tasks));
  }

  loadFromLocalStorage();//initial load of boards