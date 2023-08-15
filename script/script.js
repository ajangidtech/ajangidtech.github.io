import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader';

/*
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, canvasWidth / canvasHeight,
  0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( canvasWidth, canvasHeight );
document.getElementById("threejs-canvas").appendChild(renderer.domElement);

let stars = [];

function addStar() {
  let cube = new THREE.BoxGeometry( 1, 1, 1 );
  let texture = new THREE.MeshBasicMaterial({ color: 0xFCFE42 });
  let mesh = new THREE.Mesh(cube, texture);

  mesh.position.x = (Math.random() * 500) - 250;
  mesh.position.y = (Math.random() * 500) - 250;
  mesh.position.z = (Math.random() * 250) - 125;
  scene.add(mesh);

  return mesh;
}

function spawnStars() {
  for (let i = 0; i < 2; i++) {
    stars.push(addStar());
  }
}

function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  renderer.setSize(canvasWidth, canvasHeight);
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectMatrix();
}



camera.position.z = 400;

let x = 0;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

let counter = 20;

function animate() {
  counter++;
  if(counter >= 2) {
    spawnStars();
    counter = 0;
  }

  raycaster.setFromCamera( pointer, camera );

  //spawnStars();
  // calculate objects intersecting the picking ray
  //const intersects = raycaster.intersectObjects( scene.children );

  //for ( let i = 0; i < intersects.length; i ++ ) {

    //intersects[ i ].object.material.color.set( 0xff0000 );

  //}

  renderer.render(scene, camera);

  let tempStars = [...stars];
  let removedCount = 0;

  function removeStar(star, i) {
    scene.remove(star);
    tempStars.splice(i - removedCount, 1);
    removedCount++;
  }

  stars.forEach((item, i) => {
    item.rotation.x += 0.01;
    item.rotation.y += 0.01;
    item.position.z += 1;
    item.material.color.set( 0xFCFE42 );

    if (item.position.z > camera.position.z) {
      removeStar(item, i);
    }
  });

  stars = tempStars;

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", resizeCanvas);
window.addEventListener( 'pointermove', onPointerMove );



*/

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("threejs-canvas").appendChild( renderer.domElement );       // Add our element to the website


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

camera.position.z = 500;

const loader = new STLLoader();
let mesh;
loader.load(
    'threeDModels/ornament.stl',
    function (geometry) {
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

function resizeCanvas() {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;

  renderer.setSize(canvasWidth, canvasHeight);
  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();
}

function animate() {
	requestAnimationFrame( animate );  // call the given function once the frame has been updated
	renderer.render( scene, camera );
  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;
  //camera.rotation.y += 0.1;
  if (mesh) {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  }
}

animate();

window.addEventListener("resize", resizeCanvas);
