export default function goTo(location) {
  if (
    document.querySelector("#lng").value !== "" &&
    !document.querySelector("#lat").value !== ""
  ) {
    def.coordinates.lng = Number.parseFloat(
      document.querySelector("#new-lng").value
    );
    def.coordinates.lat = Number.parseFloat(
      document.querySelector("#new-lat").value
    );
    delete def.objects;
    delete def.gltfMasses;
    def.name = "this place";
  }

  place = carleton;
  setPlace(place, province.term, city.name);
}
