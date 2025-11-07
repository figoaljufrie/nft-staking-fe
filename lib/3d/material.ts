import * as THREE from "three";

const materialLibrary = {
  default: new THREE.MeshStandardMaterial({
    color: 0x888888,
    metalness: 0.3,
    roughness: 0.7,
  }),
  metal: new THREE.MeshStandardMaterial({
    color: 0x888888,
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 1,
  }),
  plastic: new THREE.MeshStandardMaterial({
    color: 0x3366ff,
    metalness: 0,
    roughness: 0.5,
  }),
  glass: new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.1,
    transmission: 0.9,
    transparent: true,
    opacity: 0.5,
  }),
  colorful: new THREE.MeshStandardMaterial({
    color: 0xff6b6b,
    metalness: 0.2,
    roughness: 0.6,
  }),
};
