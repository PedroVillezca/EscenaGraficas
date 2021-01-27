/* eslint-disable require-jsdoc */
/*
Pedro Villezca A01282613
Gibran Gonzalez A01282778
Guillermo Saldaña A01039888
*/

import * as THREE from './node_modules/three/src/Three.js';
import {OrbitControls} from
  './node_modules/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

/**
 * Creates a conveyor belt on x,y,z coordinates and
 * rotates it in y in terms of angle given
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} angle
 */
function createZConveyorBelt(x, y, z) {
  const mainStructureGeom = new THREE.BoxGeometry(5, 0.5, 30);
  const mainStructureMaterial = new THREE
      .MeshLambertMaterial({color: 0xbfc7cc});

  const mainStructure = new THREE
      .Mesh(mainStructureGeom, mainStructureMaterial);
  mainStructure.position.set(0+x, 3+y, 0+z);
  scene.add(mainStructure);

  const legGeom = new THREE.CylinderGeometry(0.5, 0.5, 3);
  const legOne = new THREE.Mesh(legGeom, mainStructureMaterial);
  const legTwo = new THREE.Mesh(legGeom, mainStructureMaterial);
  const legThree = new THREE.Mesh(legGeom, mainStructureMaterial);
  const legFour = new THREE.Mesh(legGeom, mainStructureMaterial);
  legOne.position.set(-2+x, 1.5+y, -12+z);
  legTwo.position.set(2+x, 1.5+y, -12+z);
  legThree.position.set(2+x, 1.5+y, 12+z);
  legFour.position.set(-2+x, 1.5+y, 12+z);
  scene.add(legOne);
  scene.add(legTwo);
  scene.add(legThree);
  scene.add(legFour);
}

function createXConveyorBelt(x, y, z) {
  const mainStructureGeom = new THREE.BoxGeometry(15, 0.5, 5);
  const mainStructureMaterial = new THREE
      .MeshLambertMaterial({color: 0xbfc7cc});

  const mainStructure = new THREE
      .Mesh(mainStructureGeom, mainStructureMaterial);
  mainStructure.position.set(0+x, 3+y, 0+z);
  scene.add(mainStructure);
}

function createWall(x, y, z, width, height, depth) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshLambertMaterial({color: 0x61676a});

  const wall = new THREE.Mesh(geometry, material);
  wall.position.set(x, y, z);

  scene.add(wall);
}

function createLamp(x, y, z) {
  // Material para la lampara
  const material = new THREE.MeshLambertMaterial({color: 0x666000});

  // Base de la lampara
  const lampBaseGeom = new THREE.CylinderGeometry(2, 0.15, 0.5, 32);
  const lampBase = new THREE.Mesh(lampBaseGeom, material);
  lampBase.position.set(x, y, z);
  scene.add(lampBase);

  // Cable donde cuelga la lampara
  const lampWireGeom = new THREE.CylinderGeometry(0.15, 0.15, 2, 32);
  const lampWire = new THREE.Mesh(lampWireGeom, material);
  lampWire.position.set(x, y - 1, z);
  scene.add(lampWire);

  // Base para el Foco
  const lampConeGeom = new THREE.CylinderGeometry(0.15, 0.75, 1, 32);
  const lampCone = new THREE.Mesh(lampConeGeom, material);
  lampCone.position.set(x, y - 2.1, z);
  scene.add(lampCone);

  // Foco
  const lampLightGeom = new THREE.SphereGeometry(0.5, 32, 32);
  const lampLight = new THREE.Mesh(lampLightGeom, material);
  lampLight.position.set(x, y - 2.35, z);
  scene.add(lampLight);
}

function objectSetup() {
  const spawnObjectGeometry = new THREE.BoxGeometry(5, 8, 5);
  const spawnObjectMaterial = new THREE.MeshLambertMaterial(
      {color: 0xbfc7cc},
  );

  const spawnObject = new THREE.Mesh(
      spawnObjectGeometry, spawnObjectMaterial,
  );
  spawnObject.position.set(-30, 4, 15);
  scene.add( spawnObject );

  // Se crean el piso, el techo y las 4 paredes
  createWall(0, 0, 0, 70, 1, 40);
  createWall(0, 20, 0, 71, 1, 40);
  createWall(-35, 10, 0, 1, 20, 40);
  createWall(35, 10, 0, 1, 20, 40);
  createWall(0, 10, -20, 71, 20, 1);

  // Objetos para la conveyor belt
  createZConveyorBelt(-30, 0, -2.5);
  createZConveyorBelt(30, 0, -2.5);

  createZConveyorBelt(-10, 0, -2.5);
  createZConveyorBelt(10, 0, -2.5);

  createXConveyorBelt(-20, 0, -15);
  createXConveyorBelt(20, 0, -15);

  createXConveyorBelt(0, 0, 10);

  // Se crean las lamparas del techo
  createLamp(-20, 19.25, 0);
  createLamp(0, 19.25, 0);
  createLamp(20, 19.25, 0);
}

function main() {
/*
 Se crea la camara para ver la escena, se le da una posicion propia
 y un punto inicial al cual mirar
*/
  const camera = new THREE
      .PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.y = 25;
  camera.position.z = 30;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // Se crea el renderiazdor, que a su vez genera el canvas para la escena
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor('#000000');
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Evento por si acaso las dimensiones de la pantalla llegasen a cambiar
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  });

  // Se agregan los controles para la camara
  const controls = new OrbitControls(camera, renderer.domElement);

  // Se crean las lineas del sistema de coordenadas
  const gridXZ = new THREE.GridHelper(100, 10,
      new THREE.Color(0xff0000), new THREE.Color(0xffffff));
  scene.add(gridXZ);

  // Funcion para crear todos los objetos en la escena
  objectSetup(scene);


  // Funcion que maneja las animaciones de los objetos
  const animate = function() {
    controls.update();
    requestAnimationFrame( animate );

    // light.position.x = (light.position.x + 0.5) % 100;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  };

  // Fuente de luz para testing

  const lightTop = new THREE.PointLight(0xFFFFFF, 1.8, 500);
  lightTop.position.set(0, 17, 0);
  scene.add(lightTop);

  const lightDown = new THREE.PointLight(0xFFFFFF, 1.8, 500);
  lightDown.position.set(0, -30, 0);
  scene.add(lightDown);

  const light = new THREE.AmbientLight( 0xFFFFFF, 0.5 ); // soft white light
  scene.add( light );

  animate();
}


main();
