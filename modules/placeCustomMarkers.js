export default function placeCustomMarker(places) {
  const markers = [];
  for (const key in places) {
    place = places[key];
    const element = document.createElement("div");
    element.className = "mapbox-marker";
    element.setAttribute("id", key);
    element.setAttribute("title", places[key].name);
    if (place.logo) {
      element.style.setProperty("background-image", `url(${place.logo})`);
    }

    markers.push(element);
    element.addEventListener("click", (e) => {
      const id = e.target.id;
      place = places[id];
      setPlace(place, province.term, city.name);
      for (const marker of markers) {
        marker.remove();
      }
    });
    new mapboxgl.Marker(element).setLngLat(place.coordinates).addTo(map);
  }

  return markers;
}
