import { MeshBasicMaterial } from "three";

export default hoverHighlihgtMateral = new MeshBasicMaterial({
  transparent: true,
  opacity: 0.1,
  color: 0xff_ff_cc,
  depthTest: false,
});
