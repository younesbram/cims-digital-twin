import canada from "./canada.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
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

let toggle = { osm: false };

// Favourite places ⭐⭐⭐⭐⭐⭐⭐
let carleton = canada.provinces.ON.cities.Ottawa.places.CDC;
let parliament = canada.provinces.ON.cities.Ottawa.places.PB;
let downsview = canada.provinces.ON.cities.Toronto.places.DA;
let hm = canada.provinces.ON.cities.Ottawa.places.HM;

let province = { term: "" };
let city = { name: "" };
let place = { id: "", name: "" };

// Set model oringin from WGS coordinates to Three (0,0,0) _________________________________________________________________________________________
let modelOrigin,
  modelAltitude,
  modelRotate,
  modelAsMercatorCoordinate,
  modelTransform;
setModelOrigin(carleton);

let previousSelection = {
  mesh: null,
  material: null,
};

const mouse = new Vector4(-1000, -1000, 1, 1);

let locGeojson = { source: { id: false } };
let invisibleMasses = [];
let lng = { canada: canada.lng },
  lat = { canada: canada.lat };

// Setting Mapbox 🗺️📦
mapbox();

// GUI  👌 _________________________________________________________________________________________

const closeButton = document.getElementById("close-window");
cdt.closeWindow();

// ICDT 🍁
document.getElementById("icdt").addEventListener("click", () => {
  openIframe("https://canadasdigitaltwin.ca", "icdt");
});

// User Login 👤
document.getElementById("login").addEventListener("click", () => {
  openIframe("login.html");
});

// User settings ⚙️
document.getElementById("settings").addEventListener("click", () => {
  openIframe("settings.html");
});

// User info ℹ️
document.getElementById("info").addEventListener("click", () => {
  openIframe("info.html");
});

// Layers 🍰
cdt.toggleButton("layers-button", false, "layers-container");

// Tools ⚒️
cdt.toggleButton("tools-button", false, "tools-container");
// Map Style 🎨 
cdt.toggleButton("styles-button", false, "styles-container");
const currentStyle = {};
const styles = Array.from(document.getElementById('styles-container').children)
styles.forEach(style => {
  document.getElementById(style.id).addEventListener('click', () => {
    currentStyle.id = style.id.split('-')[0];
    currentStyle.url = cdt.mapStyles[currentStyle.id].url;
    map.setStyle(currentStyle.url);
});
})


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
let newPlaceToggle = cdt.toggleButton('add-place-button', false, "new-place-container")
const addPlaceButton = document.getElementById('add-place-button')
addPlaceButton.addEventListener("click", () => {
  cancelObject.click();
  newPlaceToggle = !newPlaceToggle
  if (newPlaceToggle) {
  createPolygon();
  map.getCanvas().style.cursor = "crosshair" 
  document.getElementById("new-place-container").classList.remove('hidden');
  }
  else{
    cancelPlace.click()
  }
});
cancelPlace.addEventListener("click", () => {
  newPlaceToggle = false;
  document.getElementById("new-place-container").classList.add('hidden');
  map.getCanvas().style.cursor = "" 
  addPlaceButton.classList.remove('selected-button')
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
    document.getElementById('add-place-button').click()
  } else {
    place = places[id];
    setPlace(place, province.term, city.name);
    cdt.unhideElementsById('add-object-button')
  }
});

// Object ➡️________________
let objectSelector = document.getElementById("object-select");
const cancelObject = document.getElementById("cancel-new-object");
cdt.createOptions(objectSelector, places, 2);
// Create new object 🆕
let newObjectToggle = cdt.toggleButton('add-object-button', false, "new-object-container")
const addObjectButton = document.getElementById('add-object-button')
addObjectButton.addEventListener("click", () => {
  cancelPlace.click();
  newObjectToggle = !newObjectToggle
  if (newObjectToggle) {
  addNewObject()
  document.getElementById("new-object-container").classList.remove('hidden');
  }
  else{
    document.getElementById("new-object-container").classList.add('hidden');
    cancelObject.click()
  }
});
cancelObject.addEventListener("click", () => {
  newObjectToggle = false;
  document.getElementById("new-object-container").classList.add('hidden');
  addObjectButton.classList.remove('selected-button')
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
      minzoom: 13,
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
  closeButton.classList.remove("hidden");
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
  cdt.hideElementsById("place-select", 'geocoder');
}

function getCities(provinceCode) {
  citySelect = document.getElementById("city-select");
  cdt
    .getJson(
      `https://geogratis.gc.ca/services/geoname/en/geonames.json?province=${provinceCode}&concise=CITY`
    )
    .then((jsonCity) => {
      const cityItems = jsonCity.items;
      while (citySelect.childElementCount > 1) {
        citySelect.removeChild(citySelect.lastChild);
      }
      cityItems.forEach((cityItem) => {
        let cityName = cityItem.name;
        let option = document.createElement("option");
        option.innerHTML = cityName;
        option.setAttribute("id", cityName);
        citySelect.appendChild(option);
        cdt.sortChildren(citySelect);
      });
    });
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
  const osmButton = document.getElementById("osm");
  osmButton.onclick = () => {
    toggle = !toggle;
    cdt.selectedButton(osmButton, toggle, true);
    map.getLayer("OSM-buildings");
    toggle ? loadOSM(map, 0.9) : map.removeLayer("OSM-buildings");
    toggle.osm = toggle;
  };
}

function flyToCanada() {
  let home = document.getElementById("home");
  home.addEventListener("click", () => {
    flyTo(map, lng.canada, lat.canada, 4, 0);
    map.fitBounds(canada.bbox);
    setTimeout(function () {
      location.reload();
    }, 2000);
  });
}

function selectObj(selector) {
  selector.addEventListener("change", () => {
    let id = selector[selector.selectedIndex].id;
    if (id === "add-object") {
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

function setModelOrigin(place) {
  let lng = place.coordinates.lng;
  let lat = place.coordinates.lat;
  let msl = place.coordinates.msl;

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

  if (province.cities) getCities(province.code);
  if (city.places)
    cdt.createOptions(document.getElementById("place-select"), city.places);
  removeFromScene();
  removeGeojson(locGeojson);
  setModelOrigin(place);
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
    loadMasses(invisibleMasses, place, false);
    if (isMobile) {
      cdt.hideElementsById(
        "place-select"
      );
      loadMasses(visibleMasses, place, true);
    }
    cdt.unhideElementsById("object-select","add-place-button", "add-object-button");
    cdt.createOptions(objectSelector, place.objects, 2);
    selectObj(objectSelector);
    cdt.loadObjectsGltf(place, scene);
  }
}

async function createLayerButtons(city) {
  let layers = city.layers;
  const layerContainer = document.getElementById("layers-container");
  cdt.removeChildren(layerContainer, 1);
  for (key in layers) {
    const osm = document.getElementById("osm");
    const newButton = osm.cloneNode(true);
    newButton.classList.remove("hidden");
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
      if (element.id.match(/region.*/)) province.term = element.short_code.substring(3);
      if (element.id.match(/place.*/)) city.name = element.text;
        i++;
    });
    console.log(province.term, city.name);
    province = canada.provinces[province.term]
    city = province.cities[city.name];
    places = city.places;
    cdt.createOptions(placeSelector, places);
    cdt.unhideElementsById("place-select", "add-place-button");
    addPlaceGeojson(places);
    createLayerButtons(city);
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
  }

  marker.on("dragend", onDragEnd);
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
  if (! newPlaceId) {
    newPlaceId = "NN"
  }
  newPlace.name = document.getElementById("place-name").value;
  if (! newPlace.name) {
    newPlace.name = "no name"
  }
  newPlace.placeGeojson = draw.getAll();
  loadGeojson(map, newPlace.placeGeojson, newPlaceId);
  draw.deleteAll();
  let cityName = canada.provinces[province.term].cities[city.name];
  if (!cityName)
    canada.provinces[province.term].cities[city.name] = {
      name: city.name,
      places: {},
    };
  canada.provinces[province.term].cities[city.name].places[newPlaceId] =
    newPlace;
  cdt.createOptions(
    placeSelector,
    canada.provinces[province.term].cities[city.name].places,
    2
  );
  console.log(canada.provinces[province.term].cities[city.name]);
  cdt.unhideElementsById("object-select", "add-object-button");
}

function addNewObject() {
  const newObject = {};
  let newObjectId = document.getElementById("object-id").value.toUpperCase();
  newObject.name = document.getElementById("object-name").value;
  newObject.coordinates = {};
  newObject.coordinates.lng = document.getElementById("object-lng").value;
  newObject.coordinates.lat = document.getElementById("object-lat").value;
  newObject.coordinates.msl = document.getElementById("object-msl").value;
  newObject.coordinates.trueNorth =
    document.getElementById("object-true-north").value;
  // newObject.glbFile = document.getElementById("object-glb-input");
  canada.provinces[province.term].cities[city.name] = {
    name: city.name,
    objects: {},
  };
  console.log(canada.provinces[province.term].cities[city.name].objects);
  canada.provinces[province.term].cities[city.name].objects[newObjectId] =
    newObject;
  cdt.createOptions(
    objectSelector,
    canada.provinces[province.term].cities[city.name].objects,
    2
  );
  console.log(canada.provinces[province.term]);

  // 🔍find out if new object is inside place:
  // let isInPlace = turf.booleanPointInPolygon(pt, polygon);
  // if (!isInPlace) message("Object outside place")
}
