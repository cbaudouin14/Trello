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

  // Fonction utilitaire pour mettre à jour la couleur d'une tâche
  window.updateTaskColor = function (taskElement, targetColumnId) {
    const cardColorDiv = taskElement.querySelector(".card_color");
    if (cardColorDiv) {
      cardColorDiv.style.background = colors[targetColumnId];
    }
  };

  // Création des tâches
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      /* e */
      const form = document.getElementById("task_form");
      form.classList.add("open");
    });
    close_form.addEventListener("click", () => {
      /* e */
      const form = document.getElementById("task_form");
      form.classList.remove("open");
    });
    form_btn.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      const title = document.getElementById("form_title").value;
      const description = document.getElementById("form_description").value;
      // Colonne ciblée
      const targetId = button.dataset.target;
      const container = document.getElementById(targetId);

      // Création de la carte
      const task = document.createElement("div");
      task.classList.add("section_card");
      task.setAttribute("draggable", "true");
      task.id = "task-" + Date.now();

      const taskStorage = {
        id: task.id,
        column: targetId,
        title: title,
        description: description,
      };

      setTaskOnList(taskStorage, getTaskList())

      // Contenu de la carte
      task.innerHTML = `
        <div class="card_color" style="background:${colors[targetId]}; height:40px; border-radius:10px 10px 0 0;"></div>
        <h4 class="card_title" style="margin-left:10px; font-weight:500;">${title}</h4>
        <p style="margin: 5px 10px 10px 10px; font-size:14px;">${description}</p>
      `;

      // Ajout dans la colonne
      container.appendChild(task);
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
  console.log(tasks);
  
  if (!tasks) {
    return [];
  }
  return JSON.parse(tasks);
}