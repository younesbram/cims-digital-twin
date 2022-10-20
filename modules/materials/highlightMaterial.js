import { MeshBasicMaterial, DoubleSide } from "three";

export default highlightMaterial = new MeshBasicMaterial({
  color: 0xcc_cc_50,
  flatShading: true,
  side: DoubleSide,
  transparent: true,
  opacity: 0.9,
  depthTest: false,
  polygonOffset: true,
  polygonOffsetFactor: 1,
  polygonOffsetUnits: 1,
});
