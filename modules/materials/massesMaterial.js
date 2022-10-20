import { MeshStandardMaterial, DoubleSide } from "three";

export default massesMaterial = new MeshStandardMaterial({
  color: 0x55_55_55,
  flatShading: true,
  side: DoubleSide,
  emissive: 0x55_55_55,
});
