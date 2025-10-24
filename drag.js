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
function makeDraggable(task) {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
}

function insertAboveTask(list, mouseY) {
  const els = list.querySelectorAll(".section_card:not(.is-dragging)");
  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach(task => {
    const { top } = task.getBoundingClientRect();
    const offset = mouseY - top;
    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
}

function initDragAndDrop() {
  const droppables = document.querySelectorAll(".trello_section");

  droppables.forEach(zone => {
    zone.addEventListener("dragover", e => {
      e.preventDefault();

      const curTask = document.querySelector(".is-dragging");
      if (!curTask || !(curTask instanceof Node)) return;

      const list = zone.querySelector(".section_list");
      const bottomTask = insertAboveTask(list, e.clientY);

      if (!bottomTask) {
        list.appendChild(curTask);
      } else {
        list.insertBefore(curTask, bottomTask);
      }

      updateTaskColor(curTask, list.id);
    });
  });
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1 && node.classList.contains("section_card")) {
        makeDraggable(node);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".section_card").forEach(makeDraggable);
  initDragAndDrop();

  document.querySelectorAll(".section_list").forEach(section => {
    observer.observe(section, { childList: true });
  });
});
