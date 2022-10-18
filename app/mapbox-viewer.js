//Prototype 1 - Client for Canada.js server
//The geocoding queires will stay client side

//connecting to database
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//connection url
const url = 'mongodb://localhost:3000';

//database name
const dbName = 'cimsTest';

//connecting to server
mongodb.MongoClient.connect(url, (err, client) => {
  //assert.equal(null, err);
  console.log("Successful connection to server");

  const db = client.db(dbName);

  client.close();
})

import canada from "./canada.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import {
  AmbientLight,
  DirectionalLight,
  Scene,
  Group,
  PerspectiveCamera,
  WebGLRenderer,
  Matrix4,
  Vector3,
  Vector4,
  AxesHelper,
  Raycaster,
} from "three";

import * as cdt from "../modules/cdt-api";

// GLOBAL OBJECTS 🌎  _________________________________________________________________________________________

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    polygon: false,
    trash: false,
  },
  defaultMode: "draw_polygon",
});

let scene,
  map,
  three,
  camera,
  renderer,
  raycaster,
  intersections,
  gltfMasses,
  places,
  placeGeojson,
  placeGeojsons,
  marker;

let markers = [];

let toggle = { osm: false };

// Favourite places ⭐⭐⭐⭐⭐⭐⭐
let carleton = canada.provinces.ON.cities.Ottawa.places.CDC;
let parliament = canada.provinces.ON.cities.Ottawa.places.PB;
let downsview = canada.provinces.ON.cities.Toronto.places.DA;
let hm = canada.provinces.ON.cities.Ottawa.places.HM;

let province = { term: "" };
let city = { name: "" };
let place = { id: "", name: "" };
let object;

// Set model oringin from WGS coordinates to Three (0,0,0) _________________________________________________________________________________________
let modelOrigin,
  modelAltitude,
  modelRotate,
  modelAsMercatorCoordinate,
  modelTransform;
setPlaceOrigin(carleton);

let previousSelection = {
  mesh: null,
  material: null,
};

const mouse = new Vector4(-1000, -1000, 1, 1);

let locGeojson = { source: { id: false } };
let invisibleMasses = [];
let lng = { canada: canada.lng },
  lat = { canada: canada.lat };

// GUI  👌 _________________________________________________________________________________________

const closeButton = document.getElementById("close-window");
let loadingContainer = document.getElementById("loader-container");
cdt.closeWindow();

// ICDT 🍁
let icdtToggle = false;
icdtToggle = openWindow("icdt", icdtToggle, "https://canadasdigitaltwin.ca", "icdt");

function openWindow(item, toggle, url = `${item}.html`, className) {
  const button = document.getElementById(`${item}-button`);
  let buttons = Array.from(button.parentElement.children)
  button.addEventListener("click", () => {
    buttons.forEach(b => {
      b.classList.remove('selected-button')
    });
    if (!toggle) openIframe(url, className);
    cdt.selectedButton(button, !toggle);
    if (toggle) cdt.closeWindow(true);
    toggle = !toggle;
  });
  return toggle;
}

// // User Login 👤
let loginToggle = false;
loginToggle = openWindow("login", loginToggle);

// Info ℹ️
let infoToggle = false;
infoToggle = openWindow("info", infoToggle);

// Settings ⚙️
let settingsToggle = false;
settingsToggle = openWindow("settings", settingsToggle);

// Search bar 🔍
cdt.toggleButton("search-button", true, "geocoder", "selectors");

// Layers 🍰
cdt.toggleButton("layers-button", false, "layers-container");

// Show OSM buildings 🏢
const osmButton = document.getElementById("osm-button");

// Tools ⚒️
cdt.toggleButton("tools-button", false, "tools-container");

// Setting Mapbox 🗺️📦
mapbox();

// Map Style 🎨
cdt.toggleButton("styles-button", false, "styles-container");
const currentStyle = {};
const styles = Array.from(document.getElementById("styles-container").children);
styles.forEach((style) => {
  document.getElementById(style.id).addEventListener("click", () => {
    currentStyle.id = style.id.split("-")[0];
    currentStyle.url = cdt.mapStyles[currentStyle.id].url;
    map.setStyle(currentStyle.url);
  });
});

// THREE JS 3️⃣  ______________________________________________________________
const customLayer = {
  id: "three-scene",
  type: "custom",
  renderingMode: "3d",
  onAdd: function (map, gl) {
    camera = new PerspectiveCamera();
    scene = new Scene();
    const axes = new AxesHelper(10);
    axes.material.depthTest = false;
    axes.renderOrder = 3;
    scene.add(axes);

    // create three.js lights to illuminate the model
    const lightColor = 0xffffff;
    const ambientLight = new AmbientLight(lightColor, 0.2);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(lightColor, 0.9);
    directionalLight.position.set(0, 400, 600).normalize();
    scene.add(directionalLight);

    // use the Mapbox GL JS map canvas for three.js
    renderer = new WebGLRenderer({
      canvas: map.getCanvas(),
      context: gl,
      antialias: true,
    });
    renderer.autoClear = false;

    raycaster = new Raycaster();
  },

  render: function (gl, matrix) {
    const rotationX = new Matrix4().makeRotationAxis(
      new Vector3(1, 0, 0),
      modelTransform.rotateX
    );
    const rotationY = new Matrix4().makeRotationAxis(
      new Vector3(0, 1, 0),
      modelTransform.rotateY
    );
    const rotationZ = new Matrix4().makeRotationAxis(
      new Vector3(0, 0, 1),
      modelTransform.rotateZ
    );

    const m = new Matrix4().fromArray(matrix);
    const l = new Matrix4()
      .makeTranslation(
        modelTransform.translateX,
        modelTransform.translateY,
        modelTransform.translateZ
      )
      .scale(
        new Vector3(
          modelTransform.scale,
          -modelTransform.scale,
          modelTransform.scale
        )
      )
      .multiply(rotationX)
      .multiply(rotationY)
      .multiply(rotationZ);

    camera.projectionMatrix = m.multiply(l);
    renderer.resetState();
    renderer.render(scene, camera);
    map.triggerRepaint();

    const freeCamera = map.getFreeCameraOptions();
    let cameraPosition = new Vector4(
      freeCamera.position.x,
      freeCamera.position.y,
      freeCamera.position.z,
      1
    );
    cameraPosition.applyMatrix4(l.invert());
    let direction = mouse
      .clone()
      .applyMatrix4(camera.projectionMatrix.clone().invert());
    direction.divideScalar(direction.w);
    raycaster.set(cameraPosition, direction.sub(cameraPosition).normalize());

    intersections = raycaster.intersectObjects(invisibleMasses);

    setIntesections();

    renderer.render(scene, camera);
  },
};

// Navigate Canada 🛬🍁 _________________________________________________________
flyToCanada();

// Place ➡️________________
let placeSelector = document.getElementById("place-select");
const cancelPlace = document.getElementById("cancel-new-place");
cdt.createOptions(placeSelector, places, 2);

// Create new place 🆕
let newPlaceToggle = cdt.toggleButton(
  "add-place-button",
  false,
  "new-place-container"
);
const addPlaceButton = document.getElementById("add-place-button");
addPlaceButton.addEventListener("click", () => {
  newPlaceToggle = !newPlaceToggle;
  if (newPlaceToggle) {
    createPolygon();
    map.getCanvas().style.cursor = "crosshair";
    document.getElementById("new-place-container").classList.remove("hidden");
  } else {
    cancelPlace.click();
  }
});
cancelPlace.addEventListener("click", () => {
  newPlaceToggle = false;
  document.getElementById("new-place-container").classList.add("hidden");
  map.getCanvas().style.cursor = "";
  addPlaceButton.classList.remove("selected-button");
  draw.deleteAll();
});
document.getElementById("upload-place").onclick = () => {
  addNewPlace();
  cancelPlace.click();
};

placeSelector.addEventListener("change", (event) => {
  places = city.places;
  id = event.target[event.target.selectedIndex].id;
  if (id === "add-place") {
    document.getElementById("tools-button").click();
    document.getElementById("add-place-button").click();
  } else {
    place = places[id];
    setPlace(place, province.term, city.name);
    cdt.unhideElementsById("add-object-button");
  }
});

// Object ➡️________________
let objectSelector = document.getElementById("object-select");
const cancelObject = document.getElementById("cancel-new-object");
cdt.createOptions(objectSelector, place.objects, 2);
// Create new object 🆕
let newObjectToggle = cdt.toggleButton(
  "add-object-button",
  false,
  "new-object-container"
);
const addObjectButton = document.getElementById("add-object-button");
addObjectButton.addEventListener("click", () => {
  newObjectToggle = !newObjectToggle;
  if (newObjectToggle) {
    addLocMarker("object");
    addNewObject();
    document.getElementById("new-object-container").classList.remove("hidden");
  } else {
    document.getElementById("new-object-container").classList.add("hidden");
    cancelObject.click();
  }
});
cancelObject.addEventListener("click", () => {
  newObjectToggle = false;
  document.getElementById("new-object-container").classList.add("hidden");
  addObjectButton.classList.remove("selected-button");
  removeMarker(markers);
});
document.getElementById("upload-object").onclick = () => {
  addNewObject();
  cancelObject.click();
};

map.on("dblclick", () => {
  if (!gltfMasses || !gltfMasses.selected) return;
  let id = gltfMasses.selected.id;
  let object = place.objects[id];
  object.id = id;
  openBimViewer(object);
});

// map.on("wheel", () => {
//   removeGeojson(locGeojson);
// });

map.on("style.load", function () {
  map.addLayer(customLayer, "waterway-label");
  if (three) setPlace(place, province.term, city.name);
});

map.on("draw.create", updateArea);
map.on("draw.delete", updateArea);
map.on("draw.update", updateArea);

document.addEventListener("keydown", (event) => {
  three = true;
  const keyName = event.key;
  if (event.altKey) {
    if (keyName === "Enter") {
      place = carleton;
      setPlace(place, province.term, city.name);
    }
    if (keyName === "c") {
      province = canada.provinces.ON;
      city = province.cities.Ottawa;
      place = carleton;
      setPlace(place, "ON", "Ottawa");
      return;
    }
    if (keyName === "p") {
      province = canada.provinces.ON;
      city = province.cities.Ottawa;
      place = parliament;
      setPlace(place, "ON", "Ottawa");
      return;
    }
    if (keyName === "h") {
      province = canada.provinces.ON;
      city = province.cities.Ottawa;
      place = hm;
      setPlace(place, "ON", "Ottawa");
      return;
    }
    if (keyName === "d") {
      province = canada.provinces.ON;
      city = province.cities.Ottawa;
      place = downsview;
      setPlace(place, "ON", "Toronto");
      return;
    }
  }
});

// FUNCTIONS _____________________________________________________________________________________________________

function flyTo(map, lng, lat, zoom = 15, pitch = 50) {
  map.flyTo({
    center: [lng, lat],
    zoom: zoom,
    pitch: pitch,
    duration: 2000,
  });
}

function flyToPlace(place, pitch = 50) {
  map.flyTo({
    center: [place.coordinates.lng, place.coordinates.lat],
    zoom: place.coordinates.zoom,
    pitch: pitch,
    duration: 2000,
  });
}

async function loadGeojson(map, geojson, id, zoom = false) {
  const source = { type: "geojson", data: geojson };
  map.addSource(id, source);
  // Add a new layer to visualize the polygon.
  map.addLayer({
    id: `${id}-fill`,
    type: "fill",
    source: id, // reference the data source
    layout: {},
    paint: {
      "fill-color": "#73CEE2", // blue color fill
      "fill-opacity": 0.1,
    },
  });
  // Add a black outline around the polygon.
  map.addLayer({
    id: `${id}-outline`,
    type: "line",
    source: id,
    layout: {},
    paint: {
      "line-color": "#000",
      "line-width": 2,
    },
  });
  locGeojson.bbox = turf.bbox(geojson);
  if (zoom) map.fitBounds(locGeojson.bbox);
}

function removeGeojson(geojson) {
  if (map.getSource(geojson.source.id)) {
    map.removeLayer(geojson.fill.id);
    map.removeLayer(geojson.outline.id);
    map.removeSource(geojson.source.id);
  }
  geojson = { source: { id: false } };
}

// ADD DEM TERRAIN 🏔️
function addTerrain(map) {
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    tileSize: 512,
    maxzoom: 14,
  });
  // add the DEM source as a terrain layer with exaggerated height
  map.setTerrain({ source: "mapbox-dem", exaggeration: 1 });
}

// LOAD OSM BUILDING 🏢
// let osmHeight = 1 *
function loadOSM(map, opacity = 0.9) {
  // Insert the layer beneath any symbol layer.
  const layers = map.getStyle().layers;
  const labelLayerId = layers.find(
    (layer) => layer.type === "symbol" && layer.layout["text-field"]
  ).id;
  // perc2color(((["get", "height"] - 3) * 100) / (66 - 3))
  map.addLayer(
    {
      id: "OSM-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      // filter: ["{elementId} === 671842709", "extrude", "false"],
      type: "fill-extrusion",
      minzoom: 11,
      paint: {
        "fill-extrusion-color": "#aaa",
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-base": ["get", "min_height"],
        "fill-extrusion-opacity": opacity,
      },
    },
    labelLayerId
  );
}

// Raycasting
function getMousePosition(event) {
  mouse.x = (event.point.x / map.transform.width) * 2 - 1;
  mouse.y = 1 - (event.point.y / map.transform.height) * 2;
}

function hasNotCollided(intersections) {
  return intersections.length === 0;
}

function highlightItem(item) {
  item.object.material = cdt.highlightMaterial;
  item.object.visible = true;
  gltfMasses.selected = item;
  gltfMasses.selected.id = item.object.name;
}

function isPreviousSeletion(item) {
  return previousSelection.mesh === item.object;
}

function restorePreviousSelection() {
  if (previousSelection.mesh) {
    previousSelection.mesh.material = previousSelection.material;
    previousSelection.mesh.visible = false;
    previousSelection.mesh = null;
    previousSelection.material = null;
  }
}

function savePreviousSelectio(item) {
  previousSelection.mesh = item.object;
  previousSelection.material = item.object.material;
}

function openIframe(iframeName, className = "iframe") {
  const url = iframeName;
  const container = document.getElementById("iframe-container");
  while (container.childElementCount > 0) container.lastChild.remove();
  const iframeContent = document.createElement("iframe");
  iframeContent.setAttribute("id", "");
  iframeContent.classList.add(className);
  iframeContent.setAttribute("src", url);
  container.appendChild(iframeContent);
  container.classList.remove("hidden");
  cdt.hideElementsById("selectors");
}

function openBimViewer(object) {
  if (!object.ifcFileName) {
    infoMessage(`⚠️ No ifc file available at ${object.name}`);
    return;
  }
  closeButton.classList.remove("hidden");
  const url = `bim-viewer.html?id=${province.term}/${city.name}/${place.id}/${object.id}`;
  const container = document.getElementById("iframe-container");
  while (container.childElementCount > 1) container.lastChild.remove();

  bimViewer = document.createElement("iframe");
  bimViewer.setAttribute("id", "bim-viewer");
  bimViewer.classList.add("iframe");
  bimViewer.setAttribute("src", url);

  container.appendChild(bimViewer);
  container.classList.remove("hidden");
  cdt.hideElementsById("place-select", "geocoder");
}

function infoMessage(message, seconds = 4) {
  let container = document.getElementById("message");
  container.innerHTML = message;
  container.classList.remove("hidden");
  setTimeout(() => container.classList.add("hidden"), seconds * 1000);
}

function getGeojson(id, url, map, locGeojson) {
  removeGeojson(locGeojson);
  locGeojson = { fill: "", outline: "" };
  cdt.getJson(url).then((geojson) => {
    locGeojson.current = geojson;
    loadGeojson(map, locGeojson.current, `${id}-locGeojson`);
    locGeojson.source = map.getSource(`${id}-locGeojson`);
    locGeojson.fill = map.getLayer(`${id}-locGeojson-fill`);
    locGeojson.outline = map.getLayer(`${id}-locGeojson-outline`);
  });
  return locGeojson;
}

// Show OSM buildings 🏢
function osmVisibility(map, toggle) {
  osmButton.onclick = () => {
    toggle = !toggle;
    cdt.selectedButton(osmButton, toggle, true);
    map.getLayer("OSM-buildings");
    toggle ? loadOSM(map, 0.9) : map.removeLayer("OSM-buildings");
    toggle.osm = toggle;
  };
}

function flyToCanada() {
  let home = document.getElementById("home-button");
  home.addEventListener("click", () => {
    flyTo(map, lng.canada, lat.canada, 4, 0);
    map.fitBounds(canada.bbox);
    setTimeout(function () {
      location.reload();
    }, 2000);
  });
}

function selectObject(selector) {
  selector.addEventListener("change", () => {
    let id = selector[selector.selectedIndex].id;
    if (id === "add-object") {
<<<<<<< HEAD
      document.getElementById("add-object-button").click();
=======
>>>>>>> 07c36ba (Navigation3 - preparing demo1 pull request (#5))
      document.getElementById("tools-container").classList.remove("hidden");
      cancelPlace.click();
      addLocMarker("object");
      document.getElementById(
        "new-object-location"
      ).innerText = `${province.term}, ${city.name}, ${place.name}`;
      document
        .getElementById("new-object-container")
        .classList.remove("hidden");
    } else {
      let object = place.objects[id];
      if (!object.id) object.id = id;
      openBimViewer(object);
    }
  });
}

function loadMasses(masses, place, visible = true, x = 0, y = 0, z = 0) {
  // GLTF masses for hovering and raycasting
  const group = new Group();
  if (!visible) group.name = `${place.id}-invisible-masses`;
  if (visible) group.name = `${place.id}-visible-masses`;
  let url = place.gltfMasses.url;
  const gltfloader = new GLTFLoader();
  gltfloader.load(url, (gltf) => {
    gltfMasses = gltf.scene;
    gltfMasses.name = `${place.id}-masses`;
    gltfMasses.position.x = x;
    gltfMasses.position.y = y;
    gltfMasses.position.z = z;
    gltfMasses.traverse((object) => {
      if (object.isMesh) {
        object.visible = visible;
        if (visible) object.material = cdt.massesMaterial;
        masses.push(object);
      }
    });
    group.add(gltfMasses);
    if (!scene.getObjectByName(`${place.id}invisible-masses`)) scene.add(group);
    if (!scene.getObjectByName(`${place.id}visible-masses`)) scene.add(group);
  });
}

function setPlaceOrigin(place) {
  let lng = place.coordinates.lng;
  let lat = place.coordinates.lat;
  let msl = place.coordinates.msl;
  let trueNorth = 0;
  setObjectOrigin(lng, lat, msl, trueNorth);
}

function setObjectOrigin(lng, lat, msl, trueNorth) {
  modelOrigin = [lng, lat];
  modelAltitude = msl;
  modelRotate = [Math.PI / 2, 0, 0];
  modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  );

  modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since the 3D model is in real world meters, a scale transform needs to be
    applied since the CustomLayerInterface expects units in MercatorCoordinates.*/
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
  };
}

function setPlace(place, provinceTerm, cityName) {
  province = canada.provinces[provinceTerm];
  city = province.cities[cityName];
  if (city.places)
    cdt.createOptions(document.getElementById("place-select"), city.places);
  removeFromScene();
  removeGeojson(locGeojson);
  setPlaceOrigin(place);
  flyToPlace(place);
  cdt.unhideElementsById("place-select");
  invisibleMasses = [];
  visibleMasses = [];
  if (!place.hasOwnProperty("objects")) {
    removeFromScene();
    infoMessage(`⚠️ No objects at ${place.name}`);
    if (place.hasOwnProperty("gltfMasses")) {
      loadMasses(visibleMasses, place, true);
    }
  } else {
<<<<<<< HEAD
    if (
      document
        .getElementById("osm-button")
        .classList.contains("selected-button")
    )
      osmButton.click();
=======
    if (document.getElementById('osm-button').classList.contains('selected-button')) osmButton.click()
>>>>>>> 07c36ba (Navigation3 - preparing demo1 pull request (#5))
    loadMasses(invisibleMasses, place, false);
    if (isMobile) {
      cdt.hideElementsById("place-select");
      loadMasses(visibleMasses, place, true);
    }
    cdt.unhideElementsById(
      "object-select",
      "add-place-button",
      "add-object-button"
    );
    cdt.createOptions(objectSelector, place.objects, 2);
    selectObject(objectSelector);
    cdt.loadObjectsGltf(place, scene);
  }
}

async function createLayerButtons(city) {
  let layers = city.layers;
  const layerContainer = document.getElementById("layers-container");
  cdt.removeChildren(layerContainer, 1);
  for (key in layers) {
    const newButton = osmButton.cloneNode(true);
    newButton.classList.remove("hidden");
    newButton.classList.remove("selected-button");
    const layer = await layers[key];
    newButton.title = `Show ${layer.name}`;
    newButton.name = `${layer.name}`;
    newButton.id = key;
    newButton.innerHTML = `${layer.svg}`;
    toggle[key] = false;
    toggleCustomLayer(newButton, toggle[key], key);
    layerContainer.appendChild(newButton);
  }
}

function removeFromScene() {
  let toRemove = scene.children.slice(3);
  if (toRemove.lenght === 0) return;
  toRemove.forEach((group) => {
    group.traverse(function (object) {
      if (object.isMesh) {
        object.geometry.dispose();
        object.material.dispose();
      }
    });
    scene.remove(group);
  });
}

function addPlaceGeojson(places) {
  const geojsons = [];
  for (let key in places) {
    place = places[key];
    placeGeojson = loadGeojson(map, place.placeGeojson, key);
    geojsons.push(placeGeojson);
    // let center = turf.center(place.placeGeojson);
    // let centerCoordinates = center.geometry.coordinates;
    // let placeMarker = new mapboxgl.Marker()
    //   .setLngLat(centerCoordinates)
    //   .addTo(map);

    // geojson.onclick((e) => {
    //   let id = e.target.id;
    //   place = places[id];
    //   setPlace(place, province.term, city.name);
    //   geojsons.forEach((geojson) => {
    //     geojson.remove();
    //   });
    // });
  }
  return geojsons;
}

function toggleCustomLayer(button, toggle, layerKey) {
  button.onclick = async () => {
    toggle = !toggle;
    cdt.selectedButton(button, toggle, true);
    let layers = canada.provinces[province.term].cities[city.name].layers;
    let initialGeojson = (await layers[layerKey]).geojson;
    if (toggle) {
      let layer = await layers[layerKey];
      layer.id = layerKey;
      layer.geojson = await layer.geojson(place);
      addCustomLayer(layer);
      layer.geojson = await initialGeojson;
    }
    if (!toggle) {
      map.removeLayer(`${layerKey}-layer`);
      map.removeSource(layerKey);
      return;
    }
  };
}

async function addCustomLayer(layer, radius = 7) {
  let customLayer = await layer;
  map.addSource(customLayer.id, {
    type: "geojson",
    data: customLayer.geojson,
  });

  let popup;
  map.addLayer({
    id: `${customLayer.id}-layer`,
    type: "circle",
    source: `${customLayer.id}`,
    paint: {
      "circle-radius": radius,
      "circle-stroke-width": 2,
      "circle-color": customLayer.color,
      "circle-stroke-color": "white",
    },
  });
  map.on("mouseenter", `${customLayer.id}-layer`, function (e) {
    let feature = e.features[0];
    popup = new mapboxgl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML(`<p>${feature.properties.title}</p>`)
      .addTo(map);
  });
  map.on("mouseleave", `${customLayer.id}-layer`, function (e) {
    popup.remove();
    map.getCanvas().style.cursor = "";
  });
  map.on("click", `${customLayer.id}-layer`, function (e) {
    let feature = e.features[0];
    new mapboxgl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML(`<p>${feature.properties.title}</p>`)
      .addTo(map);
  });
}

function removeMarker(markers) {
  if (markers)
    markers.forEach((marker) => {
      marker.remove();
    });
}

// MAPBOX 🗺️📦
function mapbox() {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoibmljby1hcmVsbGFubyIsImEiOiJjbDU2bTA3cmkxa3JzM2luejI2dnd3bzJsIn0.lKKSghBtWMQdXszpTJN32Q";
  map = new mapboxgl.Map({
    container: "map", // container ID
    style: cdt.mapStyles.dark.url,
    center: [lng.canada, lat.canada], // starting position [lng, lat]
    zoom: 4, // starting zoom
    pitch: 0,
    antialias: true,
    doubleClickZoom: false,
    projection: "globe", // display the map as a 3D globe
  });
  map.fitBounds(canada.bbox);
  // Add north and zoom controls 🔺➕
  map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
  // Activate geolocation 🌎🔍
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
      showAccuracyCircle: false,
    }),
    "bottom-left"
  );

  // Add the control to the map 🔍
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: false,
    // {color: "#73CEE2"},
    country: "ca",
    bbox: [-144, 40, -50, 78],
    limit: 3,
    mapboxgl: mapboxgl,
  });

  document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

  // Day sky
  map.on("style.load", () => {
    // Set the default atmosphere style
    // add sky styling with `setFog` that will show when the map is highly pitched
    map.setFog({
      "horizon-blend": 0.3,
      color: "#f8f0e3",
      "high-color": "#add8e6",
      "space-color": "#d8f2ff",
      "star-intensity": 0.0,
    });
    addTerrain(map);
    osmVisibility(map, toggle.osm);
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1 });
  });

  geocoder.on("result", (e) => {
    let i = 0;
    e.result.context.forEach((element) => {
      if (i == 1 && element.text == "Canada") city.name = e.result.text;
      if (element.id.match(/region.*/))
        province.term = element.short_code.substring(3);
      if (element.id.match(/place.*/)) city.name = element.text;
      i++;
    });
    console.log(province.term, city.name);
<<<<<<< HEAD
    console.log(e.result.text);
=======
>>>>>>> 07c36ba (Navigation3 - preparing demo1 pull request (#5))
    province = canada.provinces[province.term];
    city = province.cities[city.name];
    places = city.places;
    cdt.createOptions(placeSelector, places);
    cdt.unhideElementsById("place-select", "add-place-button");
    addPlaceGeojson(places);
    createLayerButtons(city);
<<<<<<< HEAD
    osmButton.click();
=======
    osmButton.click()
>>>>>>> 07c36ba (Navigation3 - preparing demo1 pull request (#5))
  });
}

function setIntesections() {
  if (hasNotCollided(intersections)) {
    restorePreviousSelection();
    // map.getCanvas().style.cursor = "";
    return;
  }

  const foundItem = intersections[0];

  if (isPreviousSeletion(foundItem)) return;

  restorePreviousSelection();
  savePreviousSelectio(foundItem);
  highlightItem(foundItem);
}

map.on("mousemove", (event) => {
  getMousePosition(event);
  map.triggerRepaint();
});

function addLocMarker(at) {
  // Draggable Marker 👇
  let markerLoc;
  // let popup;
  marker = new mapboxgl.Marker({
    id: `${at}-location-marker`,
    draggable: true,
  })
    .setLngLat(map.getCenter())
    .addTo(map);

  function onDragEnd() {
    // if (popup) popup.remove();
    markerLoc = marker.getLngLat();
    markerLoc.msl = map.queryTerrainElevation(marker.getLngLat());
    document.getElementById(`${at}-lng`).value = `${markerLoc.lng}`;
    document.getElementById(`${at}-lat`).value = `${markerLoc.lat}`;
    document.getElementById(`${at}-msl`).value = `${markerLoc.msl}`;
    setObjectOrigin(markerLoc.lng, markerLoc.lat, markerLoc.msl);
  }

  marker.on("dragend", onDragEnd);
  markers.push(marker);
}

function createPolygon() {
  map.addControl(draw);
  map.on("draw.create", updateArea);
}

function updateArea(e) {
  const data = draw.getAll();
  const answer = document.getElementById("calculated-area");
  if (data.features.length > 0) {
    const area = turf.area(data);
    // Restrict the area to 2 decimal points.
    const rounded_area = Math.round(area * 100) / 100;
    answer.innerHTML = `<p><strong>${rounded_area}</strong> mt²</p>`;
  } else {
    answer.innerHTML = "";
  }
}

function addNewPlace() {
  const newPlace = {};
  let newPlaceId = document.getElementById("place-id").value.toUpperCase();
  if (!newPlaceId) {
    newPlaceId = "NN";
  }
  newPlace.id = newPlaceId;
  newPlace.name = document.getElementById("place-name").value;
  if (!newPlace.name) {
    newPlace.name = "no name";
  }
  newPlace.placeGeojson = draw.getAll();
  loadGeojson(map, newPlace.placeGeojson, newPlaceId);
  draw.deleteAll();
  let cityName = canada.provinces[province.term].cities[city.name];
  if (!cityName)
    canada.provinces[province.term].cities[city.name] = {
      name: city.name,
      places: { objects: {} },
    };
  canada.provinces[province.term].cities[city.name].places[newPlaceId] =
    newPlace;
  place = newPlace;
<<<<<<< HEAD
  cdt.createOptions(
    placeSelector,
    canada.provinces[province.term].cities[city.name].places,
    2
  );
=======
>>>>>>> 07c36ba (Navigation3 - preparing demo1 pull request (#5))
  cdt.createOptions(objectSelector, place.objects, 2);
  console.log(canada.provinces[province.term].cities[city.name]);
  cdt.unhideElementsById("object-select", "add-object-button");
}

function addNewObject() {
  const newObject = {};
  let newObjectId = document.getElementById("object-id").value.toUpperCase();
  newObject.id = newObjectId;
  let newObjectName = document.getElementById("object-name");
  newObject.name = newObjectName.value;
  newObject.coordinates = {};
  newObject.coordinates.lng = document.getElementById("object-lng").value;
  newObject.coordinates.lat = document.getElementById("object-lat").value;
  newObject.coordinates.msl = document.getElementById("object-msl").value;
  newObject.coordinates.trueNorth =
    document.getElementById("object-true-north").value;
<<<<<<< HEAD
    document.getElementById("object-id").addEventListener('change', () => {
      console.log(newObject.name)
      if (newObject.name === "") newObject.name = "unnamed"
      makeActiveById('object-glb-input', 'object-ifc-input', 'object-true-north', 'upload-object');
      loadObjectIfc(place, newObjectId)
      loadObjectGltf(place, newObjectId)
    } )

=======
  // newObject.glbFile = document.getElementById("object-glb-input");
>>>>>>> 07c36ba (Navigation3 - preparing demo1 pull request (#5))
  if (!canada.provinces[province.term].cities.hasOwnProperty(city.name))
    canada.provinces[province.term].cities[city.name] = { name: city.name };
  if (
    !canada.provinces[province.term].cities[city.name].places[
      place.id
    ].hasOwnProperty("objects")
  )
    canada.provinces[province.term].cities[city.name].places[place.id].objects =
      {};

  console.log(canada.provinces[province.term].cities[city.name]);
  canada.provinces[province.term].cities[city.name].places[place.id].objects[
    newObjectId
  ] = newObject;
  cdt.createOptions(
    objectSelector,
    canada.provinces[province.term].cities[city.name].places[place.id].objects,
    2
  );
<<<<<<< HEAD
object = newObject;
=======
>>>>>>> 07c36ba (Navigation3 - preparing demo1 pull request (#5))

  // 🔍find out if new object is inside place:
  // let isInPlace = turf.booleanPointInPolygon(pt, polygon);
  // if (!isInPlace) message("Object outside place")
}

function degreesToRadians(degrees){return degrees * (Math.PI/180)}

function makeActiveById(...ids) {
  ids.forEach(id => {
    document.getElementById(id).classList.remove('inactive');
  });
}

document.getElementById("object-true-north").addEventListener('input', (e) => {
  let trueNorth =  e.srcElement.value;
  let radians = degreesToRadians(trueNorth)
  object.gltfModel.rotation.y = radians;
  object.trueNorth = trueNorth;
})

function loadObjectIfc(place, objectId = 'object'){
  const ifcLoader = new IFCLoader();
  ifcLoader.ifcManager.setWasmPath("../wasm/");
  const ifcInput = document.getElementById("object-ifc-input");
  ifcInput.addEventListener(
    "change",
    (changed) => {
      const group = new Group();
      group.name = `${place.id}-ifcGroup`;
      const ifcURL = URL.createObjectURL(changed.target.files[0]);
      ifcLoader.load(ifcURL, (ifcModel) => {
        ifcModel.name = `${place.id}-${objectId}-ifcModel`;
        object.ifcModel =  ifcModel; 
        group.add(ifcModel);
        scene.add(group);
        loadingContainer.classList.add("hidden");
      });
    },
    () => {
      loadingContainer.classList.remove("hidden");
      progressText.textContent = `Loading ${place.name}'s objects`;
    },
    (error) => {
      console.log(error)
      return;
    }
  );
  }
  
  function loadObjectGltf(place, objectId = 'object'){
  const gltfLoader = new GLTFLoader();
  const gltfInput = document.getElementById("object-glb-input");
  let loadingContainer = document.getElementById("loader-container");
  let progressText = document.getElementById("progress-text");
  
  gltfInput.addEventListener(
    "change",
    (changed) => {
      const group = new Group();
      group.name = `${place.id}-gltfGroup`;
      const gltfURL = URL.createObjectURL(changed.target.files[0]);
      gltfLoader.load(gltfURL, (gltf) => {
        let gltfModel = gltf.scene;
        gltfModel.name = `${place.id}-${objectId}-gltfModel`;
        object.gltfModel =  gltfModel; 
        group.add(gltfModel);
        scene.add(group);
        loadingContainer.classList.add("hidden");
      });
    },
    () => {
      loadingContainer.classList.remove("hidden");
      progressText.textContent = `Loading ${place.name}'s objects`;
    },
    (error) => {
      return;
    }
  );
  }