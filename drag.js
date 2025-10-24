const draggables = document.querySelectorAll(".section_list_card");
const droppables = document.querySelectorAll(".trello_section");

draggables.forEach((section_list_card) => {
    section_list_card.addEventListener("dragstart", () => {
        section_list_card.classList.add("is-dragging");
    });
    section_list_card.addEventListener("dragend", () => {
        section_list_card.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");
        if (!bottomTask) {
    zone.appendChild(curTask);
} else {
    zone.insertBefore(curTask, bottomTask);
}

// mise a jour couleur
updateTaskColor(curTask, zone.id);

    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".section_list_card:not(.is-dragging)");
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    els.forEach((section_list_card) => {
        const { top } = section_list_card.getBoundingClientRect();
        const offset = mouseY - top;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = section_list_card;
        }
    });
    return closestTask;
};
