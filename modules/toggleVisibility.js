export default function toggleVisibility(button, toggle, object = null) {
  button.addEventListener("click", function () {
    if (toggle) {
      this.setAttribute("title", `Show ${this.id.replace("-", " ")}`);
      this.classList.remove("selected-button");
      if (object) {
        object.classList.add("hidden");
      }

      toggle = false;
      console.log(toggle);
      return toggle;
    }

    this.setAttribute("title", `Hide ${this.id.replace("-", " ")}`);
    if (object) {
      object.classList.remove("hidden");
    }

    this.classList.add("selected-button");
    toggle = true;
    console.log(toggle);
    return toggle;
  });
}
