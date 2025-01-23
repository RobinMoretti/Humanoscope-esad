import "./style.css";
import interact from "interactjs";
import { dragMoveListener } from "./draggable.js";

console.log(interact);

interact(".draggable").draggable({
  listeners: {
    move(event) {
      dragMoveListener(event);
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll("li");

  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      if (this.classList.contains("clicked")) {
        return;
      }

      const openItems = document.querySelectorAll(".clicked");
      if (openItems.length > 0) {
        openItems.forEach((openItem) => {
          openItem.classList.remove("clicked");
        });
        this.addEventListener(
          "transitionend",
          () => {
            this.classList.add("clicked");
          },
          { once: true }
        );
      } else {
        this.classList.add("clicked");
      }
    });
  });

  document.querySelectorAll(".close-btn").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      this.parentElement.classList.remove("clicked");
    });
  });
});
