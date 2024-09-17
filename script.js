import * as THREE from 'three';

import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js';

import * as dat from 'dat.gui';

import stars from '/imgs/stars.jpg';
// import milkyway from './imgs/Sun_in_Milky_Way-1.webp';
// import sun from '/imgs/8k_sun.jpg';
// import sun from 'https://cdn.spacetelescope.org/archives/images/screen/heic1310a.jpg';
// import sun from '/imgs/space.jpg';

// Setup //

const renderer=new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth,window.innerHeight);

renderer.shadowMap.enabled=true;

document.body.appendChild(renderer.domElement);

const scene=new THREE.Scene();

const camera= new THREE.PerspectiveCamera(
    45,window.innerWidth/window.innerHeight,0.1,1000
)

const orbit= new OrbitControls(camera,renderer.domElement);

const axesHelper=new THREE.AxesHelper(5);

scene.add(axesHelper);

camera.position.set(-10,30,30);

orbit.update();


// Change Background to Some Color //

// renderer.setClearColor(0x00FF00);

// Change back Ground to some Image //

const textureLoader=new THREE.TextureLoader();

// scene.background=textureLoader.load(stars); // But This Will Give The Back Ground in 2D and you cannot Move The space

// But to make it 3D //

const cubeTextureLoader=new THREE.CubeTextureLoader();

scene.background=cubeTextureLoader.load([
    stars,
    stars,
    stars,
    stars,
    stars,
    stars
]);


// Box //

const boxGeometry=new THREE.BoxGeometry();
const boxMaterial=new THREE.MeshBasicMaterial({color:0x00ff00});
const box=new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

// Box 2 //

const box2Geometry=new THREE.BoxGeometry(4,4,4);

// Single Material

// const box2Material=new THREE.MeshBasicMaterial({
//     //color:0xFFFFFF
//     map:textureLoader.load(sun)
// });

// Multiple Material

const box2MultiMaterial=[
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map:textureLoader.load(stars)})
]

// const box2MultiMaterial=new THREE.MeshBasicMaterial({map:cubeTextureLoader.load([
//     sun,
//     sun,
//     stars,
//     stars,
//     stars,
//     stars
// ])})

const box2=new THREE.Mesh(box2Geometry,box2MultiMaterial);
box2.position.set(0,15,10);
scene.add(box2);


// Plane //

const planeGeometry=new THREE.PlaneGeometry(30,30);
const planeMaterial=new THREE.MeshStandardMaterial({
    color:0xffffff,
    side:THREE.DoubleSide
});
const plane=new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);
plane.receiveShadow=true;

// Grid Helper //

const gridHelper= new THREE.GridHelper(30,5);
scene.add(gridHelper);

// Sphere //

const sphereGeometry= new THREE.SphereGeometry(4,50,50);
const sphereMaterial=new THREE.MeshStandardMaterial({color:0x0000ff});
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);

scene.add(sphere);

sphere.castShadow=true;
sphere.position.set(-10,10,0)

// Ambient Light 

// const ambient=new THREE.AmbientLight(0xffffff);
// scene.add(ambient);

// Directional Light

const directionalLight=new THREE.DirectionalLight(0xffffff,0.8);
scene.add(directionalLight)
directionalLight.position.set(-20,30,0)
directionalLight.castShadow=true;

// DLightHelper
const dLightHelper=new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dLightHelper);

// Dlight Shadow Helper //

const dlightshadowhelper=new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(dlightshadowhelper)

directionalLight.shadow.camera.bottom= -12; //changing the directional light camera field of view

// SpotLight //

// const spotLight=new THREE.SpotLight(0xFFFFFF,10000);
// scene.add(spotLight);
// spotLight.position.set(-100,100,0);
// spotLight.castShadow=true;
// // spotLight.angle=0.2

// // SpotLight Helper//

// const sLightHelper=new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);

// FOG //

// Method 1 //
// scene.fog=new THREE.Fog(0xffffff,0,200);

// Method 2 //
scene.fog=new THREE.FogExp2(0xffffff,0.01);

// DAT GUI //

const gui=new dat.GUI();
const options={
    sphereColor:'#ffea00',
    wireframe:false,
    speed:0.01,
    angle:0.2,
    penumbra:0,
    intensity:10000
};

gui.addColor(options,'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options,'wireframe').onChange(function(e){
    sphere.material.wireframe=e;
})

// Sphere Bounce and Other//

gui.add(options,'speed',0,0.1);
gui.add(options,'angle',0,1);
gui.add(options,'penumbra',0,1);
gui.add(options,'intensity',0,1000000);

// Animate //
let step=0;


function animate(){
    // box.rotation.x += time/1000;
    // box.rotation.y += time/1000;//
    box.rotation.x+=0.01;
    box.rotation.y+=0.01;

    // spotLight.angle=options.angle;
    // spotLight.penumbra=options.penumbra;
    // spotLight.intensity=options.intensity;
    // sLightHelper.update();

    // Sphere Bounce //
    step += options.speed;
    sphere.position.y = 10* Math.abs(Math.sin(step))
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

