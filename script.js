document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-task-btn");
  const form_btn = document.querySelector(".form_btn")
  const close_form = document.querySelector(".close_popup_form")

  // Couleurs selon la colonne
  const colors = {
    backlog: "#f44336",  // Rouge
    toDo: "#2196F3",     // Bleu
    doing: "#FF9800",    // Orange
    review: "#9C27B0",   // Violet
    test: "#009688",     // Vert d'eau
    done: "#4CAF50"      // Vert
  };

  window.updateTaskColor = function (taskElement, targetColumnId) {
    const cardColorDiv = taskElement.querySelector(".card_color");
    if (cardColorDiv) {
      cardColorDiv.style.background = colors[targetColumnId];
    }
  };

  // Création des tâches
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      form.classList.add("open");
    });

    close_form.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      form.classList.remove("open");
    });

    form_btn.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      const title = document.getElementById("form_title").value;
      const description = document.getElementById("form_description").value;

      if (!title || title.trim() === "") return;
      if (description === null) return;

      // Heure
      const creationTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Colonne
      const targetId = button.dataset.target;
      const container = document.getElementById(targetId);

      const task = document.createElement("div");
      task.classList.add("section_card");
      task.setAttribute("draggable", "true");
      task.id = "task-" + Date.now();

      // Stockage
      const taskStorage = {
        id: task.id,
        column: targetId,
        title: title,
        description: description,
        time: creationTime
      };
      setTaskOnList(taskStorage, getTaskList());

      task.innerHTML = `
        <div class="card_color" style="background:${colors[targetId]}; height:40px; border-radius:10px 10px 0 0;"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; padding:0 10px;">
          <h4 class="card_title" style="font-weight:500;">${title}</h4>
          <button class="delete-task" title="Supprimer" style="border:none; background:none; cursor:pointer; font-size:16px;">🗑️</button>
        </div>
        <p style="margin: 5px 10px 2px 10px; font-size:14px;">${description}</p>
        <p style="margin: 0 10px 10px 10px; font-size:12px; color:#555;">${creationTime}</p>
      `;

      // Ajout dans la colonne
      container.appendChild(task);
      makeDraggable(task);


      const deleteBtn = task.querySelector(".delete-task");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        task.remove();
      });

      form.classList.remove("open");
    });
  });
});

function setTaskOnList(task, taskList) {
  taskList.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function getTaskList() {
  const tasks = localStorage.getItem('taskList')?.toString();
  if (!tasks) return [];
  return JSON.parse(tasks);
}

