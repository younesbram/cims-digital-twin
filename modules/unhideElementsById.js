export default function unhideElementsById(...ids) {
  for (const id of ids) {
    document.getElementById(id).classList.remove("hidden");
  }
}
