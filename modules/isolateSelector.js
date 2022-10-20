export default function isolateSelector(selectors, ...keys) {
  for (const selector of selectors) {
    if (keys.includes(selector.id)) {
      selector.classList.remove("hidden");
    } else {
      selector.classList.add("hidden");
    }
  }
}
