import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function loadObjectGltf(path, object, currentScene, camera) {
  const gltfloader = new GLTFLoader();
  const loadingContainer = document.querySelector("#loader-container");
  const progressText = document.querySelector("#progress-text");
  const categories = [
    "roofs",
    "slabs",
    "curtainwalls",
    "windows",
    "doors",
    "walls",
    "structure",
  ];
  for (const category of categories) {
    const gltfPath = `${path}${object.id}_${category}_allFloors.gltf`;
    gltfloader.load(
      gltfPath,
      (gltf, objectGltf) => {
        objectGltf = gltf.scene;
        objectGltf.name = `${object.id}-${category}`;
        currentScene.add(objectGltf);
        loadingContainer.classList.add("hidden");
        if (category === "walls") {
          const geometry = objectGltf.children[0];
          camera.fitToBox(geometry);
        }
      },
      () => {
        loadingContainer.classList.remove("hidden");
        progressText.textContent = `Loading ${object.name}`;
      },
      (error) => {}
    );
  }
}
