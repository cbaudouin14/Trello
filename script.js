document.addEventListener("DOMContentLoaded", () => {
  // --- Variables globales ---
  let draggedTask = null;
  const form_btn = document.querySelector(".form_btn");
  const close_form = document.querySelector(".close_popup_form");

  // Couleurs par colonne
  const colors = {
    backlog: "#f44336",
    toDo: "#2196F3",
    doing: "#FF9800",
    review: "#9C27B0",
    test: "#009688",
    done: "#4CAF50"
  };

  window.updateTaskColor = function(task, columnId) {
    const colorDiv = task.querySelector(".card_color");
    if (colorDiv) colorDiv.style.background = colors[columnId];
  };

  document.querySelectorAll(".add-task-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      if (form) {
        form.classList.add("open");
        form.dataset.target = btn.dataset.target;
      }
    });
  });

  if (close_form) {
    close_form.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      if (form) form.classList.remove("open");
    });
  }

  if (form_btn) {
    form_btn.addEventListener("click", (e) => {
      e.preventDefault();
      const form = document.getElementById("task_form");
      const targetId = form?.dataset?.target;
      const container = targetId ? document.getElementById(targetId) : null;

      const title = document.getElementById("form_title")?.value?.trim();
      const description = document.getElementById("form_description")?.value?.trim() || "";
      if (!title || !container) return;

      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const taskData = {
        id: "task-" + Date.now(),
        column: targetId,
        title,
        description,
        time
      };

      const taskEl = createTaskElement(taskData);
      container.appendChild(taskEl);

      const tasks = getTaskList();
      tasks.push(taskData);
      localStorage.setItem("taskList", JSON.stringify(tasks));

      form.reset();
      form.classList.remove("open");
    });
  }

  function createTaskElement({id, column, title, description, time}) {
    const task = document.createElement("div");
    task.classList.add("section_card");
    task.setAttribute("draggable", "true");
    task.id = id;

    const cardcolor = document.createElement("div");
    cardcolor.classList.add("card_color");
    cardcolor.style.background = colors[column];
    cardcolor.style.height = "40px";
    cardcolor.style.borderRadius = "10px 10px 0 0";

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.padding = "0 10px";

    const titleH4 = document.createElement("h4");
    titleH4.classList.add("card_title");
    titleH4.textContent = title;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "none";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      task.remove();
      const tasks = getTaskList().filter(t => t.id !== id);
      localStorage.setItem("taskList", JSON.stringify(tasks));
    });

    const descEl = document.createElement("p");
    descEl.textContent = description;
    descEl.style.margin = "5px 10px 2px 10px";

    const timeEl = document.createElement("p");
    timeEl.textContent = time;
    timeEl.style.margin = "0 10px 10px 10px";
    timeEl.style.fontSize = "12px";
    timeEl.style.color = "#555";

    header.appendChild(titleH4);
    header.appendChild(deleteBtn);

    task.appendChild(cardcolor);
    task.appendChild(header);
    task.appendChild(descEl);
    task.appendChild(timeEl);

    task.addEventListener("dragstart", (e) => {
      draggedTask = task;
      e.dataTransfer.effectAllowed = "move";
      task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
      task.classList.remove("dragging");
      draggedTask = null;
    });

    return task;
  }

  function getTaskList() {
    const raw = localStorage.getItem("taskList");
    return raw ? JSON.parse(raw) : [];
  }

  function loadTasks() {
    getTaskList().forEach(t => {
      const container = document.getElementById(t.column);
      if (container) container.appendChild(createTaskElement(t));
    });
  }
  loadTasks();

  document.querySelectorAll(".section_list").forEach(column => {
    column.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      column.classList.add("survol");
    });

    column.addEventListener("dragleave", () => {
      column.classList.remove("survol");
    });

    column.addEventListener("drop", (e) => {
      e.preventDefault();
      column.classList.remove("survol");
      if (!draggedTask) return;
      column.appendChild(draggedTask);
      updateTaskColor(draggedTask, column.id);

      const tasks = getTaskList().map(t => {
        if (t.id === draggedTask.id) t.column = column.id;
        return t;
      });
      localStorage.setItem("taskList", JSON.stringify(tasks));

      draggedTask.classList.remove("dragging");
      draggedTask = null;
    });
  });
});
