const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const todoContainer = document.getElementById("todo-container");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // 1. Récupérer la valeur
  const title = input.value.trim();
  if (title === "") return;

  // 2. Créer la tâche
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("draggable", "true"); // pour ton collègue
  task.id = "task-" + Date.now(); // id unique
  task.textContent = title;

  // 3. Ajouter dans la colonne "À faire"
  todoContainer.appendChild(task);

  // 4. Reset du formulaire
  input.value = "";
});
