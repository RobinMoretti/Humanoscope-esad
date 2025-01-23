import interact from "interactjs";

export function dragMoveListener(event) {
  const target = event.target;
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  target.style.transform = `translate(${x}px, ${y}px)`;

  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}


/*
interact("#dropzone").dropzone({
  accept: ".draggable",
  overlap: 0.75,
  ondrop: (event) => {
    const draggableElement = event.relatedTarget;
    const dropzoneElement = event.target;
    const rect = draggableElement.getBoundingClientRect();
    const dropzoneRect = dropzoneElement.getBoundingClientRect();
    const newRelativeX = rect.left - dropzoneRect.left;
    const newRelativeY = rect.top - dropzoneRect.top;

    dropzoneElement.appendChild(draggableElement);

    draggableElement.style.transform = `translate(${newRelativeX}px, ${newRelativeY}px)`;
    draggableElement.setAttribute("data-x", newRelativeX);
    draggableElement.setAttribute("data-y", newRelativeY);
  },
  ondropdeactivate: (event) => {
    event.target.classList.remove("dropTarget");
    event.relatedTarget.classList.remove("canDrop");
  },
});

interact(".tableau").dropzone({
  accept: ".draggable",
  overlap: 0.6,
  ondrop: (event) => {
    const draggableElement = event.relatedTarget;
    const tableauElement = event.target;
    const rect = draggableElement.getBoundingClientRect();
    const tableauRect = tableauElement.getBoundingClientRect();
    const newRelativeX = rect.left - tableauRect.left;
    const newRelativeY = rect.top - tableauRect.top;

    tableauElement.appendChild(draggableElement);

    draggableElement.style.transform = `translate(${newRelativeX}px, ${newRelativeY}px)`;
    draggableElement.setAttribute("data-x", newRelativeX);
    draggableElement.setAttribute("data-y", newRelativeY);
  },
});

interact(".clicked").dropzone({
  accept: ".draggable",
  overlap: 0.6,
  ondragenter: (event) => {
    console.log("Drag entered clicked zone");
    event.target.classList.add("dropTarget");
    event.relatedTarget.classList.add("canDrop");
  },
  ondragleave: (event) => {
    console.log("Drag left clicked zone");
    event.target.classList.remove("dropTarget");
    event.relatedTarget.classList.remove("canDrop");
  },
  ondrop: (event) => {
    console.log("Dropped inside clicked zone");
    const draggableElement = event.relatedTarget;
    const clickedElement = event.target;
    const tableau = clickedElement.querySelector(".tableau");
    if (!tableau) {
      console.error("No tableau found inside clicked element!");
      return;
    }

    const rect = draggableElement.getBoundingClientRect();
    const tableauRect = tableau.getBoundingClientRect();
    const newRelativeX = rect.left - tableauRect.left;
    const newRelativeY = rect.top - tableauRect.top;
    tableau.appendChild(draggableElement);

    draggableElement.style.transform = `translate(${newRelativeX}px, ${newRelativeY}px)`;
    draggableElement.setAttribute("data-x", newRelativeX);
    draggableElement.setAttribute("data-y", newRelativeY);
  },
  ondropdeactivate: (event) => {
    event.target.classList.remove("dropTarget");
    event.relatedTarget.classList.remove("canDrop");
  },
});
*/
