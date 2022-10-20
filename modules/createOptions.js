import sortChildren from "../modules/sortChildren.js";

export default function createOptions(selector, objects, keepSelectors = 2) {
  while (selector.childElementCount > keepSelectors) {
    selector.lastChild.remove();
  }

  for (const object in objects) {
    const name = objects[object].name;
    const option = document.createElement("option");
    option.innerHTML = name;
    option.setAttribute("id", object);
    option.classList.add("option");
    selector.append(option);
    sortChildren(selector);
  }
}
