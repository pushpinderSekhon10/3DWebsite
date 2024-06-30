// please note that the tutorial https://www.youtube.com/watch?v=_OwJV2xL8M8 was used for help in this project



import * as three from 'three'
import './style.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import gsap from "gsap"

// Scene
const scene = new three.Scene();

// Sphere
const geometry = new three.SphereGeometry(3, 64, 64);
const material = new three.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.8
});
const mesh = new three.Mesh(geometry, material);
scene.add(mesh);

//sizes
const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Light 
const light = new three.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
scene.add(light);

// Add ambient light


// Camera
const camera = new three.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);
// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new three.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera);


//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5



//resize
window.addEventListener("resize", ()=>
{
  //update size
  size.width = window.innerWidth
  size.height = window.innerHeight
  //update camera
  
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)

  
  
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//timeline
const tl = gsap.timeline({default: 1})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y: 1})
tl.fromTo('nav', {y: "-100%" }, {y:"0%"})
tl.fromTo(".title",{opacity: 0}, {opacity: 1})

//mouse Anim color

let mouseDown = false
let rgb = []
window.addEventListener('mousedown', ()=> (mouseDown = true))
window.addEventListener('mouseup', ()=> (mouseDown = false))

window.addEventListener('mousemove', (e) =>{
  if (mouseDown)
    {
      rgb = [
        Math.round(e.pageX /size.width *255), 
        Math.round(e.pageY /size.width *255),
        150
      ]
      let newColor = new three.Color(`rgb(${rgb.join(",")})`)
      
      gsap.to(mesh.material.color, {r:newColor.r, g: newColor.g, b: newColor.b})
    }
})