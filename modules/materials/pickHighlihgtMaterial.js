import { MeshBasicMaterial } from "three";

export default pickHighlihgtMateral = new MeshBasicMaterial({
  transparent: true,
  opacity: 0.6,
  color: 0xff_ff_30,
  depthTest: false,
});
