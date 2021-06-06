import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // make it full screen
camera.position.setZ(30); // move camera postion along z-axis for better viewing

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial( { color:0xFF6347, wireframe: true});
const material = new THREE.MeshStandardMaterial( { color:0xFF6347});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(25,25,25); // position point light wrt torus

const ambientLight = new THREE.AmbientLight(0xffffff); // light all object equally
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)

function animate(){// renders infinitly
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate()