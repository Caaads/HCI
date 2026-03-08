// 1) Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101820);

// 2) Camera
const camera = new THREE.PerspectiveCamera(
  75, // FOV
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near
  1000 // Far
);
camera.position.z = 5;

// 3) Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById("app").appendChild(renderer.domElement);

// 4) Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(4, 5, 6);
scene.add(pointLight);

// 5) Geometry + Material + Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00  });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Optional: random motion config (Math.random)
const randomSpinX = 0.01 + Math.random() * 0.02;
const randomSpinY = 0.01 + Math.random() * 0.02;
const randomMoveAmp = 0.2 + Math.random() * 0.4;

// 6) Animation loop
function animate(time) {
  time *= 0.001; // ms to seconds

  cube.rotation.x += randomSpinX;
  cube.rotation.y += randomSpinY;
  cube.position.y = Math.sin(time * 2) * randomMoveAmp;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// 7) Responsiveness function
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
window.addEventListener("resize", onWindowResize);
