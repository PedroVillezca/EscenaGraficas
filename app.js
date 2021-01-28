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

function createMachine(x, y, z) {
  const machineMaterial = new THREE
      .MeshLambertMaterial({color: 0xbfc7cc});

  const voidMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

  const buttonMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});

  const machineFrontGeom = new THREE.BoxGeometry(10, 8, 2);
  const machineFront = new THREE.Mesh(machineFrontGeom, machineMaterial);
  machineFront.position.set(x, y + 4, z + 4.5);
  scene.add(machineFront);

  const machineBackGeom = new THREE.BoxGeometry(10, 8, 2);
  const machineBack = new THREE.Mesh(machineBackGeom, machineMaterial);
  machineBack.position.set(x, y + 4, z - 4.5);
  scene.add(machineBack);

  const machineTopGeom = new THREE.CylinderGeometry(
      2, 2, 10, 32, 1, false, 0, Math.PI);
  const machineTop = new THREE.Mesh(machineTopGeom, machineMaterial);
  machineTop.position.set(x, y + 7, z);
  machineTop.rotation.z += (Math.PI / 2);
  machineTop.scale.set(1, 1, 2.5);
  scene.add(machineTop);

  const centerCylinderGeom = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
  const centerCylinder = new THREE.Mesh(centerCylinderGeom, machineMaterial);
  centerCylinder.position.set(x, y + 10, z);
  scene.add(centerCylinder);

  const leftCylinderGeom = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
  const leftCylinder = new THREE.Mesh(leftCylinderGeom, machineMaterial);
  leftCylinder.position.set(x - 3, y + 10, z);
  scene.add(leftCylinder);

  const rightCylinderGeom = new THREE.CylinderGeometry(0.5, 0.5, 4, 32);
  const rightCylinder = new THREE.Mesh(rightCylinderGeom, machineMaterial);
  rightCylinder.position.set(x + 3, y + 10, z);
  scene.add(rightCylinder);

  const leftVoidGeom = new THREE.BoxGeometry(1, 5, 8);
  const leftVoid = new THREE.Mesh(leftVoidGeom, voidMaterial);
  leftVoid.position.set(x - 4.4, y + 5.5, z);
  scene.add(leftVoid);

  const rightVoidGeom = new THREE.BoxGeometry(1, 5, 8);
  const rightVoid = new THREE.Mesh(rightVoidGeom, voidMaterial);
  rightVoid.position.set(x + 4.4, y + 5.5, z);
  scene.add(rightVoid);

  const centerButtonGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
  const centerButton = new THREE.Mesh(centerButtonGeom, buttonMaterial);
  centerButton.position.set(x, y + 6, z + 5.5);
  centerButton.rotation.x += (Math.PI / 2);
  scene.add(centerButton);

  const leftButtonGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
  const leftButton = new THREE.Mesh(leftButtonGeom, buttonMaterial);
  leftButton.position.set(x - 3, y + 6, z + 5.5);
  leftButton.rotation.x += (Math.PI / 2);
  scene.add(leftButton);

  const rightButtonGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
  const rightButton = new THREE.Mesh(rightButtonGeom, buttonMaterial);
  rightButton.position.set(x + 3, y + 6, z + 5.5);
  rightButton.rotation.x += (Math.PI / 2);
  scene.add(rightButton);
}

// Funcion para crear los objetos en la cinta transportadora
function createTransportable(scene) {
  const geom = new THREE.SphereGeometry(1.5, 32, 32);
  const material = new THREE.MeshLambertMaterial({color: 0x00b8eb});
  const sphere = new THREE.Mesh(geom, material);
  sphere.position.set(-30, 5, 15); // Misma posicion que el spawnObject
  scene.add(sphere);

  return {
    mesh: sphere, 
    startMoving: false,
    pathSegment: 0
  };
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

  const voidMaterial = new THREE.MeshBasicMaterial({color: 0x000000});

  const spawnVoidGeom = new THREE.BoxGeometry(4.5, 4, 1);
  const spawnVoid = new THREE.Mesh(spawnVoidGeom, voidMaterial);
  spawnVoid.position.set(-30, 5, 12.75);
  scene.add(spawnVoid);

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

  // Creacion de la maquina interactuable
  createMachine(0, 0, 10);

  // Creacion de la canasta al final de la cinta
  createWall(30, 1, 15, 5, 0.3, 3);
  createWall(27.5, 1.85, 15, 0.3, 2, 3);
  createWall(32.5, 1.85, 15, 0.3, 2, 3);

  createWall(30, 1.85, 13.65, 5, 2, 0.3);
  createWall(30, 1.85, 16.35, 5, 2, 0.3);

  // Se inicializa el arreglo con los objetos para la cinta
  const conveyorObjects = [];
  for(let i = 0; i < 7; i++) {
    conveyorObjects.push(createTransportable(scene));
  }

  return {
    conveyorObjects
  };
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
  const allObjects = objectSetup(scene);

  // Se obtienen los objetos que iran sobre la cinta transportadora
  var conveyorObjects = allObjects.conveyorObjects;
  // Se setea el primer objeto a que se mueva
  conveyorObjects[0].startMoving = true;

  /* 
   - Arreglo para los puntos en los cuales dara vuelta el objeto
   - Cada elemento del arreglo es la componente del punto que se va
     a checar con el objeto
   - El indice del arreglo indica el segmento al que apunta 
  */
  const POINTS = [-15, -10, 10, 10, -15, 30, 15, 3];
  // Funcion que maneja las animaciones de los objetos
  const animate = function() {
    controls.update();
    requestAnimationFrame(animate);

    // light.position.x = (light.position.x + 0.5) % 100;
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    conveyorObjects.forEach((obj, i) => {
      // Revisa si el objeto puede moverse
      if (!obj.startMoving) {
        return;
      }

      switch(obj.pathSegment) {
        case 0:
          obj.mesh.position.z -= 0.5;
          if (obj.mesh.position.z <= POINTS[0]) {
            if (i < conveyorObjects.length - 1) {
              conveyorObjects[i+1].startMoving = true;
            }
            
            obj.mesh.position.z = POINTS[0];
            obj.pathSegment++;
          }
          break;

        case 1:
          obj.mesh.position.x += 0.5;
          if (obj.mesh.position.x >= POINTS[1]) {
            obj.mesh.position.x = POINTS[1];
            obj.pathSegment++;
          }
          break;

        case 2:
          obj.mesh.position.z += 0.5;
          if (obj.mesh.position.z >= POINTS[2]) {
            obj.mesh.position.z = POINTS[2];
            obj.pathSegment++;
          }
          break;
        case 3:
          obj.mesh.position.x += 0.5;
          if (obj.mesh.position.x >= POINTS[3]) {
            obj.mesh.position.x = POINTS[3];
            obj.pathSegment++;
          }
          break;
        case 4:
          obj.mesh.position.z -= 0.5;
          if (obj.mesh.position.z <= POINTS[4]) {
            obj.mesh.position.z = POINTS[4];
            obj.pathSegment++;
          }
          break;

        case 5:
          obj.mesh.position.x += 0.5;
          if (obj.mesh.position.x >= POINTS[5]) {
            obj.mesh.position.x = POINTS[5];
            obj.pathSegment++;
          }
          break;

        case 6:
          obj.mesh.position.z += 0.5;
          if (obj.mesh.position.z >= POINTS[6]) {
            obj.mesh.position.z = POINTS[6];
            obj.pathSegment++;
          }
          break;

        case 7:
          obj.mesh.position.y -= 0.5;
          if (obj.mesh.position.y <= POINTS[7]) {
            obj.mesh.position.y = POINTS[7];
            obj.pathSegment++;
          }
          break;

        case 8:
          let index = i+1;
          if (index > conveyorObjects.length - 1) {
            index = 0;
          }
          
          if (conveyorObjects[index].mesh.position.y <= POINTS[7]) {
            obj.pathSegment=0;
            obj.mesh.position.set(-30,5,15);
          }
          break;

        default:
          console.error("SEGMENT NOT VALID: ", obj.pathSegment);
      }

    });

    /*
    objetos[] = [(Mesh, # de segmento, startMoving)]
    for (obj in objetos) {
      if (!obj.startMoving) {
        continue;
      }
       
      if (obj.num === 0) {
        obj.mesh.position.x += v;
        if (obj.mesh.position.x === x1 && obj.mesh.position.z === z1) {
          objetos[i + 1].startMoving = true;
          obj.num ++;
        }
      } else if (obj.num)
      
    }

    */

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
