document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-task-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = prompt("Nom de la tâche :");
      if (!title || title.trim() === "") return;

      const targetId = button.dataset.target;
      const container = document.getElementById(targetId);

      const task = document.createElement("div");
      task.classList.add("section_card");
      task.setAttribute("draggable", "true");
      task.id = "task-" + Date.now();
      task.innerHTML = `<h4>${title}</h4>`;

      container.appendChild(task);
    });
  });
});
