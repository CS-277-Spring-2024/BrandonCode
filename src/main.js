import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

// make a scene
const scene = new THREE.Scene();
scene.backgroundColor = 0xFF5D33;
scene.fog = new THREE.Fog(0xA5A9B0, 0.0025, 200);
const raycaster = new THREE.Raycaster();

// setup camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.x = -3;
  camera.position.z = 15;
  camera.position.y = 2;
  
//setup a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

let fpsControls = new PointerLockControls( camera ,  document.body );
let locked = false;

document.body.addEventListener( 'click', function () {
    if (!locked){
    fpsControls.lock();
    locked = true;
    } else {
    fpsControls.unlock(); 
    locked = false;  
    }
}, false );

document.body.addEventListener( 'f', function () {
    //lock mouse on screen
    fpsControls.unlock();
}, false );

//OPTIONAL

// add lights
scene.add(new THREE.AmbientLight(0xFFFFFF));
const dirLight = new THREE.DirectionalLight(0xFFFFFF);
dirLight.position.set(5, 12, 8);
dirLight.castShadow = true;
dirLight.intensity = 1;
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 200;
dirLight.shadow.camera.right = 10;
dirLight.shadow.camera.left = -10;
dirLight.shadow.camera.top = 10;
dirLight.shadow.camera.bottom = -10;
dirLight.shadow.mapSize.width = 512;
dirLight.shadow.mapSize.height = 512;
dirLight.shadow.radius = 4;
dirLight.shadow.bias = -0.0005;


const loader = new GLTFLoader();

loader.load('/assets/gltf/fire_ext/korean_fire_extinguisher_01_4k.gltf', function (gltf) {
    // Access the root object of the loaded gltf
    const root = gltf.scene;

    // Define the scale factor
    const scaleFactor = 5; // Adjust this value as needed

    // Apply the scale to the root object
    root.scale.set(scaleFactor, scaleFactor, scaleFactor);
    root.position.set(0,-2,-11.5)
    // Add the scaled object to the scene
    scene.add(root);
}, undefined, function (error) {
    console.error(error);
});
// instantiate a loader
const loader2 = new OBJLoader();

// load a resource
// loader2.load(
// 	// resource URL
// 	'/assets/gltf/table.obj',
// 	// called when resource is loaded
// 	function ( object ) {
// 		// Scale down the loaded object
// 		object.scale.set(0.06, 0.06, 0.06); // Adjust the scale factor as needed
// 		object.position.set(-14,-1.2,-6)
// 		// Add the scaled object to the scene
//         object.castShadow=true;
// 		scene.add( object );
// 	},
// 	// called when loading is in progress
// 	function ( xhr ) {
// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
// 	},
// 	// called when loading has errors
// 	function ( error ) {
// 		console.log( 'An error happened' );
// 	}
// );

const loader3 = new GLTFLoader();

loader3.load('/assets/gltf/wooden_writing_desk_with_props/scene.gltf', function (gltf) {
    // Access the root object of the loaded gltf
    const root = gltf.scene;

    // Define the scale factor
    const scaleFactor = 3; // Adjust this value as needed

    // Apply the scale to the root object
    root.scale.set(scaleFactor, scaleFactor, scaleFactor);
    root.position.set(-22,-2,-11.5)
    // Add the scaled object to the scene
    scene.add(root);
}, undefined, function (error) {
    console.error(error);
});

const loader4 = new GLTFLoader();
loader4.load('/assets/gltf/metal_door/scene.gltf', function (gltf) {
    // Access the root object of the loaded gltf
    const root = gltf.scene;

    // Define the scale factor
    const scaleFactor = 3; // Adjust this value as needed

    // Apply the scale to the root object
    root.scale.set(scaleFactor, scaleFactor, scaleFactor);
    root.position.set(15,-2,-7.5)
    // Add the scaled object to the scene
    scene.add(root);
}, undefined, function (error) {
    console.error(error);
});

const loader5 = new GLTFLoader();
loader4.load('/assets/gltf/way_out/scene.gltf', function (gltf) {
    // Access the root object of the loaded gltf
    const root = gltf.scene;

    // Define the scale factor
    const scaleFactor = .03; // Adjust this value as needed

    // Apply the scale to the root object
    root.scale.set(scaleFactor, scaleFactor, scaleFactor);
    root.position.set(15,5,-7.5)
    root.rotation.set(0, Math.PI/2, 0);

    // Add the scaled object to the scene
    scene.add(root);
}, undefined, function (error) {
    console.error(error);
});
const loader6 = new GLTFLoader();
loader4.load('/assets/gltf/keypad/scene.gltf', function (gltf) {
    // Access the root object of the loaded gltf
    const root = gltf.scene;

    // Define the scale factor
    const scaleFactor = 0.5; // Adjust this value as needed

    // Apply the scale to the root object
    root.scale.set(scaleFactor, scaleFactor, scaleFactor);
    root.position.set(14.9,2,-4.5)
    root.rotation.set(0, Math.PI/2, 0);

    // Add the scaled object to the scene
    scene.add(root);
}, undefined, function (error) {
    console.error(error);
});

scene.add(dirLight);
// create a very large ground plane
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff, 
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.set(0, -2, 0);
groundMesh.rotation.set(Math.PI / -2, 0, 0);
groundMesh.receiveShadow = true;
scene.add(groundMesh);


// Create a texture loader
const textureLoader = new THREE.TextureLoader();

/// Load the texture image
const texture = textureLoader.load("assets/textures/marble/marble_0008_color_2k.jpg");

texture.wrapS = THREE.RepeatWrapping; // Tiling horizontally
texture.wrapT = THREE.RepeatWrapping; // Tiling vertically
texture.repeat.set(9, 3); // Repeat the texture 3 times both horizontally and vertically

// Create a vertical wall plane
const wallGeometry = new THREE.PlaneGeometry(30, 10); // Adjust dimensions as needed
const wallMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide }); // Apply the texture to the material

function createWall(geometry, material, position, rotation) {
    const wall = new THREE.Mesh(geometry, material);
    wall.position.copy(position);
    wall.rotation.copy(rotation);
    wall.receiveShadow = true;
    scene.add(wall);
    return wall;
}

// Define parameters for each wall
const wallParams = [
    { geometry: wallGeometry, material: wallMaterial, position: new THREE.Vector3(0, 2, -12.5), rotation: new THREE.Euler(0, 0, 0) },
    { geometry: wallGeometry, material: wallMaterial, position: new THREE.Vector3(0, 2, -2.5), rotation: new THREE.Euler(0, Math.PI, 0) },
    { geometry: wallGeometry, material: wallMaterial, position: new THREE.Vector3(0, 7, -7.5), rotation: new THREE.Euler(-Math.PI / 2, 0, 0) },
    { geometry: new THREE.PlaneGeometry(10, 10), material: wallMaterial, position: new THREE.Vector3(15, 2, -7.5), rotation: new THREE.Euler(0, -Math.PI / 2, 0) },
    { geometry: new THREE.PlaneGeometry(6, 10), material: wallMaterial, position: new THREE.Vector3(-15, 2, -15.5), rotation: new THREE.Euler(0, -Math.PI / 2, 0) },
    { geometry: new THREE.PlaneGeometry(6, 10), material: wallMaterial, position: new THREE.Vector3(-15, 2, .5), rotation: new THREE.Euler(0, -Math.PI / 2, 0) },
    { geometry: new THREE.PlaneGeometry(15, 10), material: wallMaterial, position: new THREE.Vector3(-22.5, 2, 3.5), rotation: new THREE.Euler(0, 0, 0) },
    { geometry: new THREE.PlaneGeometry(15, 10), material: wallMaterial, position: new THREE.Vector3(-22.5, 2, -18.5), rotation: new THREE.Euler(0, 0, 0) },
    { geometry: new THREE.PlaneGeometry(22, 10), material: wallMaterial, position: new THREE.Vector3(-30, 2, -7.5), rotation: new THREE.Euler(0, -Math.PI / 2, 0) },
    { geometry: new THREE.PlaneGeometry(15, 22), material: wallMaterial, position: new THREE.Vector3(-22.5, 7, -7.5), rotation: new THREE.Euler(-Math.PI / 2, 0, 0) },


];

// Add walls to the scene using the parameters
wallParams.forEach(params => {
    createWall(params.geometry, params.material, params.position, params.rotation);
});

// Define variables to keep track of player movement
const playerSpeed = 0.1;
let currentSpeed = playerSpeed; // Variable to keep track of current speed
let sprint = false
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
const playerDirection = new THREE.Vector3(); // Vector to track player movement direction

// Listen for keyboard events
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(event) {
    switch (event.key) {
        case 'w':
            moveForward = true;
            break;
        case 's':
            moveBackward = true;
            break;
        case 'a':
            moveLeft = true;
            break;
        case 'd':
            moveRight = true;
            break;
        case 'q':
            moveDown = true;
            break;
        case 'e':
            moveUp = true;
            break;
        case 'Shift':
            if (!sprint) {
                sprint = true;
                currentSpeed = 0.2;
            } else if (sprint) {
                currentSpeed = 0.1;
                sprint = false;
            }    
            break;    
    }
}

function onKeyUp(event) {
    switch (event.key) {
        case 'w':
            moveForward = false;
            break;
        case 's':
            moveBackward = false;
            break;
        case 'a':
            moveLeft = false;
            break;
        case 'd':
            moveRight = false;
            break;
        case 'q':
            moveDown = false;
            break;
        case 'e':
            moveUp = false;
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Reset playerDirection vector
    playerDirection.set(0, 0, 0);

    // Set player direction based on keyboard input
    if (moveForward) playerDirection.z = -1;
    if (moveBackward) playerDirection.z = 1;
    if (moveLeft) playerDirection.x = -1;
    if (moveRight) playerDirection.x = 1;
    if (moveUp) playerDirection.y = 1;
    if (moveDown) playerDirection.y = -1; 

    // Move the camera based on the player's input
    camera.translateX(playerDirection.x * currentSpeed);
    camera.translateZ(playerDirection.z * currentSpeed);
    camera.translateY(playerDirection.y * currentSpeed);


    // Move the camera based on the player's input
    //camera.position.addScaledVector(playerDirection, playerSpeed);
    renderer.render(scene, camera);

  }
  animate();