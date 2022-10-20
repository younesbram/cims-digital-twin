export default function sortChildren(parent) {
  const items = Array.prototype.slice.call(parent.children);
  items.sort((a, b) => a.textContent.localeCompare(b.textContent));
  for (const item of items) {
    const itemParent = item.parentNode;
    const detatchedItem = itemParent.removeChild(item);
    itemParent.append(detatchedItem);
  }
}
