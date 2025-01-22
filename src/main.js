document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll("li");

  listItems.forEach((item) => {
    item.addEventListener("click", function () {
      const openItems = document.querySelectorAll(".clicked");
      const alreadyClicked = this.classList.contains("clicked");

      listItems.forEach((li) => {
        li.classList.remove("clicked");
      });

      if (!alreadyClicked && openItems.length === 0) {
        this.classList.add("clicked");
      } else if (!alreadyClicked) {
        this.addEventListener(
          "transitionend",
          () => {
            this.classList.add("clicked");
          },
          { once: true }
        );
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
