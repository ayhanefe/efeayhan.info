var camera, scene, renderer, raycaster;
var geometry, material, mesh;
var sceneWidth, sceneHeight;
var dom, box, sun, ground;
var mouse;
var cameraMoves;



function onLoadComplete() {
  init();
}

function init() {
  // set up the scene
  createScene();
  // update the state (game loop)
  update();
}

function mouseMove(e){

  // calculate new camera position
  camera.position.x += Math.max(Math.min((e.clientX - mouse.x) * 0.01, cameraMoves.speed), -cameraMoves.speed);
  camera.position.y += Math.max(Math.min((mouse.y - e.clientY) * 0.01, cameraMoves.speed), -cameraMoves.speed);

  // calculate
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}
window.addEventListener('mousemove', mouseMove);

$(document).mouseleave(function () {
    camera.position.y = 1.5;
    camera.position.x = 1;
});

function createScene() {
  // set up dimensions
  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;

  // set up scene, camera and renderer
  scene = new THREE.Scene(); // 3d sceneWidth
  camera = new THREE.PerspectiveCamera(60, sceneWidth / sceneHeight, 0.1, 1000); // perspective camera
  renderer = new THREE.WebGLRenderer({alpha:true}); // render with transparent backdrop
  raycaster = new THREE.Raycaster(); // raycaster
  mouse = {x:0,y:0}; // set up mouse location
  cameraMoves = {x:0,y:0,z:-0.1,move:false,speed:0.01}; // camera movement

  renderer.shadowMap.enabled = true; // enable shadow
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(sceneWidth, sceneHeight);
  dom = document.getElementById('GraphicsContainer');
  dom.appendChild(renderer.domElement);

  // the box
  var boxGeometry = new THREE.BoxGeometry(1, 1, 1); // cube
	var boxMaterial = new THREE.MeshStandardMaterial({color: 0x883333});
	box = new THREE.Mesh(boxGeometry, boxMaterial);
	box.castShadow=true;
	box.receiveShadow=false;
	box.position.y=2;
	scene.add(box);

  // set up cam position
	camera.position.z = 6;
	camera.position.y = 1.5;
  camera.position.x = 1;

  // the sun
	sun = new THREE.DirectionalLight(0xffffff, 0.8);
	sun.position.set(0,4,1);
	sun.castShadow = true;
	scene.add(sun);

	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50 ;

	window.addEventListener('resize', onWindowResize, false); // resize callback
}

function update(){

  // animate
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  render(); // render with updated locations

	requestAnimationFrame(update); // request next update
}

function render(){
    renderer.render(scene, camera); // draw
}

function onWindowResize() {
	//resize & align
	sceneHeight = window.innerHeight;
	sceneWidth = window.innerWidth;
	renderer.setSize(sceneWidth, sceneHeight);
	camera.aspect = sceneWidth/sceneHeight;
	camera.updateProjectionMatrix();
}
