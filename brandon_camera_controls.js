import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'

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
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);
// add orbitcontrols

/*
const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = true;
controller.dampingFactor = 0.05;
//controller.minDistance = -10;
//controller.maxDistance = 20;
controller.minPolarAngle = -Math.PI / 2;
controller.maxPolarAngle = Math.PI / 2;
*/

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
scene.add(new THREE.AmbientLight(0x666666));
const dirLight = new THREE.DirectionalLight(0xaaaaaa);
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

const group = new THREE.Group()
group.name = 'blumpobs'

function createBob(x,y,z){
    const octaGeometry = new THREE.OctahedronGeometry();
    const tetraMaterial = new THREE.MeshPhongMaterial({color: new THREE.Color("red")});
    const tetrahedron = new THREE.Mesh(octaGeometry, tetraMaterial);
    tetrahedron.castShadow = true;
    tetrahedron.position.set(x,y,z)
    group.add(tetrahedron)
}

const loader = new GLTFLoader();

loader.load('/assets/gltf/fire_ext/korean_fire_extinguisher_01_4k.gltf', function (gltf) {
    // Access the root object of the loaded gltf
    const root = gltf.scene;

    // Define the scale factor
    const scaleFactor = 10; // Adjust this value as needed

    // Apply the scale to the root object
    root.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Add the scaled object to the scene
    scene.add(root);
}, undefined, function (error) {
    console.error(error);
});

for (let i = 0; i <50; i++){
    let x = Math.random() * 5;
    let y = Math.random() * 5;
    let z = Math.random() * 5;
    createBob(x,y,z);
}
/*function onMouseMove(event){
    MouseEvent.x = (event.clientX / window.innterWidth) * 2 -1;
    MouseEvent.x = (event.clientX / window.innterWidth) * 2 -1;
    console.log(mouse); 
} */
/*onRender: (clock, control, camera, scene_ => {
if (raycaster){
    raycaster.setFromCamera(pointer, camera)
    const cubes = group.children;
    const intersects = raycaster.intersectObjects(cubes,false)
    
}

})*/
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
//add stuff scene
const cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.position.x = -5;
cube.castShadow = true;
scene.add(cube);

// Create a texture loader
const textureLoader = new THREE.TextureLoader();

// Load the texture image
const texture = textureLoader.load("assets/textures/marble/marble_0008_color_2k.jpg");

texture.wrapS = THREE.RepeatWrapping; // Tiling horizontally
texture.wrapT = THREE.RepeatWrapping; // Tiling vertically
texture.repeat.set(9, 3); // Repeat the texture 3 times both horizontally and vertically

// Create a vertical wall plane
const wallGeometry = new THREE.PlaneGeometry(30, 10); // Adjust dimensions as needed
const wallMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide }); // Apply the texture to the material
const wall = new THREE.Mesh(wallGeometry, wallMaterial);

// Rotate the wall to be vertical
wall.rotation.set(0, Math.PI / 2, 0); // Rotate 90 degrees around Y-axis to make it vertical

// Position the wall
wall.position.set(5, 2, 0); // Adjust position as needed
wall.receiveShadow = true;

// Add the wall to the scene
scene.add(wall);

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
    cube.rotation.x -=0.04;
    cube.rotation.y -=0.02;
    
   // raycaster.setFromCamera(pointer, camera)
    const cubes = group.children;
   // const intersects = raycaster.intersectObjects(cubes,false) 

    controller.update();
  }
  animate();