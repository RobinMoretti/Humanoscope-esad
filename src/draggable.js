import interact from "interactjs";

export function dragMoveListener(event) {
  const target = event.target;
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  target.style.transform = `translate(${x}px, ${y}px)`;
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);

  console.log("data-x", x, "data-y", y);
}

interact(".draggable").draggable({
  inertia: true,
  //   modifiers: [
  //     interact.modifiers.restrictRect({
  //       restriction: document.body,
  //       elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
  //       endOnly: true,
  //     }),
  //   ],
  listeners: {
    start(event) {
      const target = event.target;
      const rect = target.getBoundingClientRect();
      const parentRect = target.parentNode.getBoundingClientRect();

      const x = rect.left - parentRect.left;
      const y = rect.top - parentRect.top;
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
      target.style.zIndex = 999;
    },
    move: dragMoveListener,
    end(event) {
      const target = event.target;
      const parentZIndex = parseInt(
        window.getComputedStyle(event.target.parentNode).zIndex || 0
      );
      target.style.zIndex = parentZIndex + 1;
    },
  },
});

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
