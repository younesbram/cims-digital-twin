import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const isMobile =
  /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent
  );

export default function loadObjectsGltf(site, currentScene) {
  const group = new Group();
  group.name = `${site.id}-objects`;
  const gltfloader = new GLTFLoader();
  let categories = [];
  const objects = site.objects;
  let objectGltf;
  const loadingContainer = document.querySelector("#loader-container");
  const progressText = document.querySelector("#progress-text");
  categories = isMobile
    ? []
    : ["roofs", "walls", "slabs", "curtainwalls", "windows"];

  for (const category of categories) {
    for (const id in objects) {
      const gltfPath = `${site.gltfPath}${id}_${category}_allFloors.gltf`;
      gltfloader.load(
        gltfPath,
        (gltf) => {
          objectGltf = gltf.scene;
          objectGltf.name = `${id}-${category}`;
          currentScene.getObjectByName(`${site.id}-objects`).add(objectGltf);
          loadingContainer.classList.add("hidden");
        },
        () => {
          loadingContainer.classList.remove("hidden");
          progressText.textContent = `Loading ${site.name}'s objects`;
        },
        (error) => {}
      );
    }
  }

  if (!currentScene.getObjectByName(`${site.id}-objects`)) {
    currentScene.add(group);
  }
}
