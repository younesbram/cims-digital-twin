import { IfcViewerAPI } from "web-ifc-viewer";
import { MeshBasicMaterial, DoubleSide } from "three";

import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

const listedBuildings$1 = document.querySelector("#listed-buildings");
const loadedBuildings = document.querySelector("#loaded-buildings");
const navigationBar = document.querySelector("#selectors");
const navigationButton = document.querySelector("#close-nav-bar");

export const hoverHighlihgtMateral = new MeshBasicMaterial({
  transparent: true,
  opacity: 0.3,
  color: 0xff_ff_cc,
  depthTest: false,
});

export const pickHighlihgtMateral = new MeshBasicMaterial({
  transparent: true,
  opacity: 0.6,
  color: 0xff_ff_30,
  depthTest: false,
});

export const highlightMaterial = new MeshBasicMaterial({
  color: 0xcc_cc_70,
  flatShading: true,
  side: DoubleSide,
  transparent: true,
  opacity: 0.9,
  depthTest: false,
});

export function isolateSelector(selectors, ...keys) {
  for (const selector of selectors) {
    if (keys.includes(selector.id)) {
      selector.classList.remove("hidden");
    } else {
      selector.classList.add("hidden");
    }
  }
}

export function hideElementsById(...ids) {
  for (const id of ids) {
    document.getElementById(id).classList.add("hidden");
  }
}

export function unhideElementsById(...ids) {
  for (const id of ids) {
    document.getElementById(id).classList.remove("hidden");
  }
}

export function closeNavBar() {
  let togglenavigationBar = false;
  navigationButton.addEventListener("click", () => {
    navigationBar.style.visibility = togglenavigationBar
      ? "visible"
      : "collapse";
    navigationButton.style.transform = togglenavigationBar
      ? ""
      : "rotate(180deg)";
    const navBarBackground = document.querySelector("#nav-bar");
    navBarBackground.style.backgroundColor = togglenavigationBar
      ? ""
      : "#FFFFFF00";
    navBarBackground.style.boxShadow = togglenavigationBar ? "" : "none";
    togglenavigationBar = !togglenavigationBar;
  });
}

export function createBuildingSelector(building, names, selector) {
  for (id in names) {
    const option = document.createElement("option");
    option.setAttribute("id", id);
    building.listed[id] = names[id];
    option.innerHTML = names[id];
    selector.append(option);
  }

  sortChildren(selector);
}

export function updateSelectBldgMenu(building, id) {
  const selectedOption = document.getElementById(id);
  building.current.id = id;
  if (!(building.current.id in building.loaded)) {
    delete building.listed[id];
    building.loaded[id] = id;
    loadedBuildings.append(selectedOption);
    sortChildren(loadedBuildings);
  } else {
    delete building.loaded[id];
    building.listed[id] = id;
    listedBuildings$1.append(selectedOption);
    sortChildren(listedBuildings$1);
  }
}

export function sortChildren(parent) {
  const items = Array.prototype.slice.call(parent.children);
  items.sort((a, b) => a.textContent.localeCompare(b.textContent));
  for (const item of items) {
    const itemParent = item.parentNode;
    const detatchedItem = itemParent.removeChild(item);
    itemParent.append(detatchedItem);
  }
}

export function toggleVisibility(button, toggle, object = null) {
  button.addEventListener("click", function () {
    if (toggle) {
      this.setAttribute("title", `Show ${this.id.replace("-", " ")}`);
      this.classList.remove("selected-button");
      if (object) {
        object.classList.add("hidden");
      }

      toggle = false;
    } else {
      this.setAttribute("title", `Hide ${this.id.replace("-", " ")}`);
      if (object) {
        object.classList.remove("hidden");
      }

      this.classList.add("selected-button");
      toggle = true;
    }
  });

  return toggle;
}

export function labeling(scene, collisionLocation, user = "User") {
  const message = window.prompt("Message:");

  if (!message) {
    return;
  }

  const container = document.createElement("div");
  container.className = "label-container canvas";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.className = "delete-button hidden";
  container.append(deleteButton);

  const label = document.createElement("p");
  label.textContent = `${user}: ${message}`;
  label.classList.add("label");
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

export function deleteChildren(parent) {
  while (parent.children.length > 0) {
    parent.remove(parent.children[0]);
  }
}

export function createOptions(selector, objects) {
  while (selector.childElementCount > 1) {
    selector.lastChild.remove();
  }

  for (const object in objects) {
    const name = objects[object].name;
    const option = document.createElement("option");
    option.innerHTML = name;
    option.setAttribute("id", object);
    selector.append(option);
    sortChildren(selector);
  }
}

export function selectedButton(button, toggle) {
  toggle
    ? button.classList.add("selected-button")
    : button.classList.remove("selected-button");
}

export async function getJson(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}

function setGeojson(objects) {
  const geojson = { type: "FeatureCollection" };
  geojson.features = [];
  for (const key in objects) {
    const object = objects[key];
    geojson.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [object.coordinates.lng, object.coordinates.lat],
      },
      properties: {
        title: `${object.name}`,
        description: `${object}.description`,
      },
    });
  }

  return geojson;
}

async function setMarker(objects, toggle, markers) {
  if (toggle) {
    for (const key in objects) {
      const object = objects[key];
      const element = document.createElement("div");
      element.className = "mapbox-marker";
      element.setAttribute("id", key);
      element.setAttribute(
        "title",
        object.title ? objects[key].title : objects[key].name
      );
      element.style.setProperty("width", 20);
      element.style.setProperty("height", 20);
      if (object.logo) {
        element.style.setProperty("background-image", `url(${object.logo})`);
      }

      markers.push(element);
      element.addEventListener("click", () => {});
      for (const marker of markers) {
        toggle
          ? marker.classList.remove("hidden")
          : marker.classList.add("hidden");
      }

      new mapboxgl.Marker(element).setLngLat(object.coordinates).addTo(map);
    }
  }
}
