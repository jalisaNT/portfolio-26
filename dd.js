import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const canvas = document.querySelector('canvas.webgl')
const materials = [];
const container = canvas.parentElement;
let light1, light2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75,  container.clientWidth / container.clientHeight, 0.1, 1000 );
scene.add( new THREE.AmbientLight( 0xffff, 1000 ) );

const  renderer = new THREE.WebGLRenderer({antialias:true, canvas: canvas}); // anatialias true = provide edges smooth effect
renderer.setSize( container.clientWidth,container.clientHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const textureLoader = new THREE.TextureLoader();
const bgTexture = textureLoader.load('images/portfolio_main_bg.png', onLoad );
const smallTexture = textureLoader.load('images/iri.png', onLoad );



//SPARKLE MODELS 
const geometry3D = new THREE.BufferGeometry();
const vertices = [];

const ThreeDLoader = new THREE.TextureLoader();

const sparkle1 = ThreeDLoader.load('images/glitter3.png');
const sparkle2 = ThreeDLoader.load('images/sp1.png');
const sparkle3 = ThreeDLoader.load('images/sp1.png');



for ( let i = 0; i < 10000; i ++ ) {
  const x = Math.random() * 2000 - 1000;
	const y = Math.random() * 2000 - 1000;
	const z = Math.random() * 2000 - 1000;
  vertices.push( x, y, z );

}

geometry3D.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

let parameters = [
  [ sparkle1, 8 ],
	[ sparkle2, 8 ],
	[ sparkle3, 8 ]
];

for ( let i = 0; i < parameters.length; i ++ ) {

  
	const sprite = parameters[ i ][ 0 ];
	const size = parameters[ i ][ 1 ];

  materials[ i ] = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
	materials.sizeAttenuation = true;

  const particles = new THREE.Points( geometry3D, materials[ i ] );

					particles.rotation.x = Math.random() * 6;
					particles.rotation.y = Math.random() * 6;
					particles.rotation.z = Math.random() * 6;

					scene.add( particles );
}




function onLoad(){
  const img = bgTexture.image;
}
scene.background = bgTexture;

//phiLength, thetaStart, and thetaLength parameters
const geometry = new THREE.SphereGeometry( 15, 18, 15, 0, 1.2, 1,  0.7  );
const material = new THREE.MeshBasicMaterial( { map: bgTexture } );
const sphere = new THREE.Mesh( geometry, material );
sphere.rotation.y = 1;

sphere.position.y = -1.7;
//scene.add( sphere );
camera.position.z = 17;



const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false; //diable pan\
controls.enableZoom = false;
// Set the orbit center to your shape's position

controls.enableDamping = true; // Smooth motion

//TRACK MOUSE
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;
  mouseX = (e.clientX - windowHalfX) / 800;
  mouseY = (e.clientY - windowHalfY) / 800;
})

//d
let circles = [ ];

const geometryy = new THREE.SphereGeometry( 0.1, 32, 16 );

const materiall = new THREE.MeshBasicMaterial( { map: smallTexture , refractionRatio: 10.95 , side: THREE.DoubleSide} );


for ( let i = 0; i < 500; i ++ ) {
  const mesh = new THREE.Mesh( geometryy, materiall );
	mesh.position.x = Math.random() * 100 * 5;
	mesh.position.y = Math.random() * 10 - 5;
	mesh.position.z = Math.random() * 10 - 5;
	mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 0.5 + 2;
 
	scene.add( mesh );

	circles.push( mesh );
  

}


function render() {
  const timer = 0.0001 * Date.now();
  camera.position.x += (mouseX - camera.position.x);
  camera.position.y += (-mouseY - camera.position.y);
  camera.lookAt(scene.position);

  for ( let i = 0, il = circles.length; i < il; i ++ ) {

					const spheree = circles[ i ];

          spheree.position.x = 50 * Math.cos( timer + i );
          spheree.position.y = 20 * Math.cos( timer + i / 1.1 );
          spheree.position.z = 20 * Math.cos( timer + i / .10);

        }
  
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( render );

function resizeView() {
     const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);}

window.addEventListener('resize', resizeView);