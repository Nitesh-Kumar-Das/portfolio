import * as THREE from "three";

/**
 * Stepped gradient for meshToonMaterial.
 *
 * NearestFilter + RedFormat are REQUIRED, not incidental: linear filtering
 * would interpolate between the steps and produce a smooth ramp, which is
 * exactly the CGI look this design is avoiding. Three hard bands read as
 * flat marker fill.
 */
export function createToonGradient() {
  const colors = new Uint8Array([80, 160, 255]);
  const map = new THREE.DataTexture(colors, colors.length, 1, THREE.RedFormat);
  map.minFilter = THREE.NearestFilter;
  map.magFilter = THREE.NearestFilter;
  map.needsUpdate = true;
  return map;
}
