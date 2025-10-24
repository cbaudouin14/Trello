document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-task-btn");

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

      // Titre
      const title = prompt("Titre de la tâche :");
      if (!title || title.trim() === "") return;

      // Description
      const description = prompt("Description de la tâche :");
      if (description === null) return;

      // Heure
      const creationTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const targetId = button.dataset.target;
      const container = document.getElementById(targetId);

      const task = document.createElement("div");
      task.classList.add("section_card");
      task.setAttribute("draggable", "true");
      task.id = "task-" + Date.now();


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
        <h4 class="card_title" style="margin-left:10px; font-weight:500;">${title}</h4>
        <p style="margin: 5px 10px 2px 10px; font-size:14px;">${description}</p>
        <p style="margin: 0 10px 10px 10px; font-size:12px; color:#555;">${creationTime}</p> <!-- ICI seulement -->
      `;

      container.appendChild(task);
    });
  });
});

function setTaskOnList(task, taskList) {
  taskList.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function getTaskList() {
  const tasks = localStorage.getItem('taskList')?.toString();
  console.log(tasks);

  if (!tasks) return [];
  return JSON.parse(tasks);
}
