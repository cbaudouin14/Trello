document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-task-btn");

  const colors = {
    backlog: "#f44336",  // Rouge
    toDo: "#2196F3",     // Bleu
    doing: "#FF9800",    // Orange
    review: "#9C27B0",   // Violet
    test: "#009688",     // Vert d'eau
    done: "#4CAF50"      // Vert
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      /* e */

      // titre
      const title = prompt("Titre de la tâche :");
      if (!title || title.trim() === "") return;

      // description
      const description = prompt("Description de la tâche :");
      if (description === null) return;


      const targetId = button.dataset.target;
      const container = document.getElementById(targetId);

      const task = document.createElement("div");
      task.classList.add("section_card");
      task.setAttribute("draggable", "true");
      task.id = "task-" + Date.now();


      task.innerHTML = `
        <div class="card_color" style="background:${colors[targetId]}; height:40px; border-radius:10px 10px 0 0;"></div>
        <h4 class="card_title" style="margin-left:10px; font-weight:500;">${title}</h4>
        <p style="margin: 5px 10px 10px 10px; font-size:14px;">${description}</p>
      `;


      container.appendChild(task);
    });
  });
});
