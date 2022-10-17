import selectedButton from "../modules/selectedButton";

export default function toggleButton(buttonId, toggle, ...targets) {
  const button = document.getElementById(buttonId)
    button.onclick = () => {
      console.log(button.parentElement)
      toggle = !toggle;
      selectedButton(button, toggle);
      targets.forEach(target => {
             toggle
        ? document.getElementById(target).classList.remove("hidden")
        : document.getElementById(target).classList.add("hidden"); 
      });
    };
    return toggle
  }