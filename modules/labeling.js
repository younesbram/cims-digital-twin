import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

export default function labeling(scene, collisionLocation, user = "User") {
  const message = window.prompt("Message:");

  if (!message) {
    return;
  }

  const container = document.createElement("div");
  container.className = "comment-label-container canvas";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-button hidden";
  container.append(deleteButton);

  const label = document.createElement("p");
  label.textContent = `${user}: ${message}`;
  label.classList.add("comment-label");
  container.append(label);

  const labelObject = new CSS2DObject(container);
  labelObject.position.copy(collisionLocation);
  scene.add(labelObject);

  deleteButton.addEventListener("click", () => {
    labelObject.removeFromParent();
    labelObject.element = null;
    container.remove();
  });

  container.addEventListener("mouseenter", () =>
    deleteButton.classList.remove("hidden")
  );
  container.addEventListener("mouseleave", () =>
    deleteButton.classList.add("hidden")
  );
}
