document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelector(".add-task-btn");
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
  if (buttons) {
    buttons.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      if (form) form.classList.add("open");
    });
  }

  if (close_form) {
    close_form.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      if (form) form.classList.remove("open");
    });
  }

  if (form_btn) {
    form_btn.addEventListener("click", () => {
      const form = document.getElementById("task_form");
      const titleEl = document.getElementById("form_title");
      const descInput = document.getElementById("form_description");
      const title = titleEl ? titleEl.value : "";
      const description = descInput ? descInput.value : "";

      if (!title || title.trim() === "") return;
      if (description === null) return;

      // Heure
      const creationTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Colonne
      const targetId = buttons?.dataset?.target;
      const container = targetId ? document.getElementById(targetId) : null;
      if (!container) return;

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

      const cardcolor = document.createElement("div");
      cardcolor.classList.add("card_color");
      cardcolor.style.background = colors[targetId];
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
      titleH4.style.fontWeight = "500";

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-task");
      deleteBtn.title = "Supprimer";
      deleteBtn.textContent = "🗑️";
      deleteBtn.style.border = "none";
      deleteBtn.style.background = "none";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.style.fontSize = "16px";

      const descEl = document.createElement("p");
      descEl.textContent = description;
      descEl.style.margin = "5px 10px 2px 10px";
      descEl.style.fontSize = "14px";

      const timeEl = document.createElement("p");
      timeEl.textContent = creationTime;
      timeEl.style.margin = "0 10px 10px 10px";
      timeEl.style.fontSize = "12px";
      timeEl.style.color = "#555";

      // Assemblage des éléments
      header.appendChild(titleH4);
      header.appendChild(deleteBtn);
      task.appendChild(cardcolor);
      task.appendChild(header);
      task.appendChild(descEl);
      task.appendChild(timeEl);

      // Ajout dans la colonne
      container.appendChild(task);
      if (typeof makeDraggable === "function") {
        makeDraggable(task);
      }

      // Suppression
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        task.remove();

        let taskList = getTaskList();
        taskList = taskList.filter(t => t.id !== task.id);
        localStorage.setItem("taskList", JSON.stringify(taskList));
      });

      // Réinitialiser les champs du formulaire
      if (form) form.reset();
    });
  }


  function setTaskOnList(task, taskList) {
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  function getTaskList() {
    const tasks = localStorage.getItem('taskList')?.toString();
    if (!tasks) return [];
    return JSON.parse(tasks);
  }
});