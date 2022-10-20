export default function removeChildren(parent, childrenToKeep = 0) {
  while (parent.childElementCount > childrenToKeep) {
    parent.lastChild.remove();
  }
}
