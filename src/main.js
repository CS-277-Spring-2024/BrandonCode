import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// Create a stats instance
const stats = new Stats();

// Add the stats element to the document
document.body.appendChild(stats.dom);
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
  camera.position.z = -5;
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

// Variable to store the desk object
let woodenDesk;

// Variable to track whether the desk is in view
let deskInView = false;

// Distance threshold for the desk to be considered in view
const deskDistanceThreshold = 4; // Adjust as needed

// Load the GLTF model for the wooden desk
const loader3 = new GLTFLoader();
loader3.load('/assets/gltf/wooden_writing_desk_with_props/scene.gltf', function (gltf) {
    const root = gltf.scene;
    const scaleFactor = 3;
    root.scale.set(scaleFactor, scaleFactor, scaleFactor);
    root.position.set(-22, -2, -11.5);
    woodenDesk = root;
    scene.add(root);

    // Set up raycaster for object detection
    const raycaster = new THREE.Raycaster();
    const cameraDirection = new THREE.Vector3();

    // Function to check if the desk is in view
    function checkDeskInView() {
        camera.getWorldDirection(cameraDirection);
        raycaster.set(camera.position, cameraDirection);
        const intersects = raycaster.intersectObject(woodenDesk, true);
        const distanceToDesk = camera.position.distanceTo(woodenDesk.position);
        deskInView = intersects.length > 0 && distanceToDesk < deskDistanceThreshold;
    }

    // Add update function to continuously check if desk is in view
    function update() {
        checkDeskInView();
        requestAnimationFrame(update);
    }
    update();
});

// Add event listener for keyboard input
window.addEventListener('keydown', onKeyDown);

// Function to display image overlay when the desk is interacted with
function showDeskImage() {
    displayImage('/assets/images/Passcodes-header.jpg');
}

// Function to display image overlay
function displayImage(imageUrl) {
    // Create image element
    const image = document.createElement('img');
    image.src = imageUrl;
    image.style.position = 'fixed';
    image.style.top = '50%';
    image.style.left = '50%';
    image.style.transform = 'translate(-50%, -50%)';
    image.style.zIndex = '9999';
    image.style.maxWidth = '90%';
    image.style.maxHeight = '90%';
    image.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
    
    // Add click event to remove image when clicked
    image.addEventListener('click', () => {
        document.body.removeChild(image);
    });
    
    // Append image to the body
    document.body.appendChild(image);
    // Set a timeout to remove the image after a couple of seconds
    setTimeout(() => {
        document.body.removeChild(image);
    }, 3000); // 3000 milliseconds = 3 seconds
}


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
//keypad logic stuff
let code = [];
function newDigit(input){
    if (input === 'enter' && code.length === 6 && code[0] === 8 && code[1] === 5 && code[2] === 2 && code[3] === 4 && code[4] === 3 && code[5] === 9){
        console.log("--------ESCAPED-------")
        camera.position.x = 18;
        camera.position.z = -5;
        camera.position.y = 2;
    } else if (input !== 'x'){
        code.push(input);   
        if (code.length > 6) {
            code.shift();
        }
    }
console.log(code);
}
//WALL AND TEXTURE STUFF HERE
const invisibleMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0
});

const textureLoader = new THREE.TextureLoader();

// Load the texture image
const texture = textureLoader.load("assets/textures/marble/marble_0008_color_2k.jpg");

texture.wrapS = THREE.RepeatWrapping; // Tiling horizontally
texture.wrapT = THREE.RepeatWrapping; // Tiling vertically
texture.repeat.set(9, 3); // Repeat the texture 3 times both horizontally and vertically

// Create a vertical wall plane
const wallGeometry = new THREE.PlaneGeometry(30, 10); // Adjust dimensions as needed
const wallMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide }); // Apply the texture to the material
const walls = [];

function createWall(geometry, material, position, rotation, name) {
    const wall = new THREE.Mesh(geometry, material);
    wall.position.copy(position);
    wall.rotation.copy(rotation);
    wall.receiveShadow = true;
    wall.name = name; // Assign a name to the wall
    scene.add(wall);
    walls.push(wall); // Store the wall mesh in the walls array
    return wall;
}
// Define parameters for each wall
const wallParams = [
    { geometry: wallGeometry, material: wallMaterial, position: new THREE.Vector3(0, 2, -12.5), rotation: new THREE.Euler(0, 0, 0), name: 'x' },
    { geometry: wallGeometry, material: wallMaterial, position: new THREE.Vector3(0, 2, -2.5), rotation: new THREE.Euler(0, Math.PI, 0), name: 'x' },
    { geometry: wallGeometry, material: wallMaterial, position: new THREE.Vector3(0, 7, -7.5), rotation: new THREE.Euler(-Math.PI / 2, 0, 0), name: 'x' },
    { geometry: new THREE.PlaneGeometry(10, 10), material: wallMaterial, position: new THREE.Vector3(15, 2, -7.5), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 'x' },
    { geometry: new THREE.PlaneGeometry(6, 10), material: wallMaterial, position: new THREE.Vector3(-15, 2, -15.5), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 'x' },
    { geometry: new THREE.PlaneGeometry(6, 10), material: wallMaterial, position: new THREE.Vector3(-15, 2, .5), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 'x' },
    { geometry: new THREE.PlaneGeometry(15, 10), material: wallMaterial, position: new THREE.Vector3(-22.5, 2, 3.5), rotation: new THREE.Euler(0, 0, 0), name: 'x' },
    { geometry: new THREE.PlaneGeometry(15, 10), material: wallMaterial, position: new THREE.Vector3(-22.5, 2, -18.5), rotation: new THREE.Euler(0, 0, 0), name: 'x' },
    { geometry: new THREE.PlaneGeometry(22, 10), material: wallMaterial, position: new THREE.Vector3(-30, 2, -7.5), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 'x' },
    { geometry: new THREE.PlaneGeometry(15, 22), material: wallMaterial, position: new THREE.Vector3(-22.5, 7, -7.5), rotation: new THREE.Euler(-Math.PI / 2, 0, 0), name: 'x' },
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 2, -4.44), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 6 }, //middle row
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 2, -4.62), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 5 },
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 2, -4.78), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 4 },
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 2.19, -4.44), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 3 }, //upper row
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 2.19, -4.62), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 2 },
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 2.19, -4.78), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 1 },    
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 1.81, -4.44), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 9 }, //bottom row
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 1.81, -4.62), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 8 },
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 1.82, -4.79), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 7 },
    {geometry: new THREE.PlaneGeometry(.1, .1), material: invisibleMaterial, position: new THREE.Vector3(14.8, 1.65, -4.62), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 0 },
    {geometry: new THREE.PlaneGeometry(.12, .2), material: invisibleMaterial, position: new THREE.Vector3(14.8, 1.95, -4.22), rotation: new THREE.Euler(0, -Math.PI / 2, 0), name: 'enter' }

    
];



// Add walls to the scene using the parameters
wallParams.forEach(params => {
    createWall(params.geometry, params.material, params.position, params.rotation, params.name);
});

// Add event listener for key press
document.addEventListener('keypress', function(event) {
    if (event.key === 'r') {
        // Create a raycaster
        const raycaster = new THREE.Raycaster();
        
        // Define the direction of the raycaster based on the camera's direction
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
        
        // Calculate intersections with the walls
        const intersects = raycaster.intersectObjects(walls);
        
        // If there is at least one intersection, get the first wall and do something with it
        if (intersects.length > 0) {
            const selectedWall = intersects[0].object;
            console.log('Selected Wall:', selectedWall.name);
            newDigit(selectedWall.name);
        }
    }
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
        case 'f':
            if (deskInView) {
                // Pressed 'f' and desk is in view, show image
                showDeskImage();
                
            }
            interactWithWall();            
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
    stats.update();
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