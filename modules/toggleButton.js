import selectedButton from "../modules/selectedButton.js";

export default function toggleButton(buttonId, toggle, ...targets) {
  const button = document.getElementById(buttonId);
  button.addEventListener("click", () => {
    console.log(button.parentElement);
    toggle = !toggle;
    selectedButton(button, toggle);
    for (const target of targets) {
      toggle
        ? document.getElementById(target).classList.remove("hidden")
        : document.getElementById(target).classList.add("hidden");
    }
  });

  return toggle;
}
