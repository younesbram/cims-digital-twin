export default function selectedButton(button, toggle, changeTitle = false) {
  toggle
    ? button.classList.add("selected-button")
    : button.classList.remove("selected-button");

  changeTitle && toggle
    ? (button.title = `Hide ${button.name}`)
    : (button.title = `Show ${button.name}`);
}
