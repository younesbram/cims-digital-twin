export default function hideElementsById(...ids) {
  for (const id of ids) {
    document.getElementById(id).classList.add("hidden");
  }
}
