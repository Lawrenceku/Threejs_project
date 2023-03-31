var count=0
document.addEventListener('click', ()=>{
  if (count<1){
    count++
  document.getElementsByTagName('h1')[0].innerText='Told ya! '
  setTimeout(()=>{
    document.getElementsByTagName("h1")[0].innerText=null
  },2000)
  }
  else{
    return
  }
})

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('myCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 0, 10 );
scene.add( light );

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return new THREE.Color(`hsl(${hue}, 100%, 50%)`);
}

camera.position.z = 5;

function createCube(x, y) {
  const material = new THREE.MeshStandardMaterial({
    color: getRandomColor(),
    emissive: getRandomColor(),
    roughness: 0.5,
    metalness: 0.5
  });
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(geometry, material);
  const mouse3D = new THREE.Vector3(
    (x / window.innerWidth) * 2 - 1,
    -(y / window.innerHeight) * 2 + 1,
    0.5
  );
  mouse3D.unproject(camera);
  const dir = mouse3D.sub(camera.position).normalize();
  const distance = -camera.position.z / dir.z;
  const pos = camera.position.clone().add(dir.multiplyScalar(distance));
  cube.position.copy(pos);
  scene.add(cube);

  // Start a timer to remove the cube from the scene after 4 seconds.
  setTimeout(() => {
    scene.remove(cube);
  }, 4000);
}

function onMouseClick(event) {
  createCube(event.clientX, event.clientY);
}

function onMouseMove(event) {
  const intersects = getIntersects(event.clientX, event.clientY);
  if (intersects.length > 0) {
    const intersect = intersects[0];
    intersect.object.material.color = getRandomColor();
    intersect.object.material.emissive = getRandomColor();
  }
}

function getIntersects(x, y) {
  const mouse3D = new THREE.Vector3(
    (x / window.innerWidth) * 2 - 1,
    -(y / window.innerHeight) * 2 + 1,
    0.5
  );
  mouse3D.unproject(camera);
  const raycaster = new THREE.Raycaster(camera.position, mouse3D.sub(camera.position).normalize());
  return raycaster.intersectObjects(scene.children);
}

document.getElementById('myCanvas').addEventListener('click', onMouseClick);
document.getElementById('myCanvas').addEventListener('mousemove', onMouseMove);

function animate() {
  requestAnimationFrame(animate);
  scene.children.forEach(cube => {
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
  });
  renderer.render(scene, camera);
}

animate();


//will implement this later

/* const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('myCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.MeshStandardMaterial({
  color: getRandomColor(),
  emissive: getRandomColor(),
  roughness: 0.5,
  metalness: 0.5
});

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return new THREE.Color(`hsl(${hue}, 100%, 50%)`);
}

const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.1,
  transparent: true,
  opacity: 1.0,
  blending: THREE.AdditiveBlending
});

const particles = new THREE.Geometry();

for (let i = 0; i < 1000; i++) {
  const x = (Math.random() - 0.5) * 10;
  const y = (Math.random() - 0.5) * 10;
  const z = (Math.random() - 0.5) * 10;
  const particle = new THREE.Vector3(x, y, z);
  particles.vertices.push(particle);
}

const particleSystem = new THREE.Points(particles, particleMaterial);
particleSystem.visible = false;
scene.add(particleSystem);

camera.position.z = 5;

function createCube(x, y) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const cube = new THREE.Mesh(geometry, material);
  const mouse3D = new THREE.Vector3(
    (x / window.innerWidth) * 2 - 1,
    -(y / window.innerHeight) * 2 + 1,
    0.5
  );
  mouse3D.unproject(camera);
  const dir = mouse3D.sub(camera.position).normalize();
  const distance = -camera.position.z / dir.z;
  const pos = camera.position.clone().add(dir.multiplyScalar(distance));
  cube.position.copy(pos);
  scene.add(cube);

  setTimeout(() => {
    cube.visible = false;
    particleSystem.position.copy(cube.position);
    particleSystem.visible = true;
    setTimeout(() => {
      particleSystem.visible = false;
      scene.remove(cube);
      scene.remove(particleSystem);
    }, 5000);
  }, 5000);
}

function onMouseClick(event) {
  createCube(event.clientX, event.clientY);
}

function onMouseMove(event) {
  const intersects = getIntersects(event.clientX, event.clientY);
  if (intersects.length > 0) {
    const intersect = intersects[0];
    intersect.object.material.color = getRandomColor();
    intersect.object.material.emissive = getRandomColor();
  }
}

function getIntersects(x, y) {
  const mouse3D = new THREE.Vector3(
    (x / window.innerWidth) * 2 - 1,
    -(y / window.innerHeight) * 2 + 1,
    0.5
  );
  mouse3D.unproject(camera);
  const raycaster = new THREE.Raycaster(camera.position, mouse3D.sub(camera.position).normalize());
  return raycaster.intersectObjects(scene.children);
}

document.getElementById('myCanvas').addEventListener('click', onMouseClick);
document.getElementById('myCanvas').addEventListener('mousemove', onMouseMove);

function animate() {
  requestAnimationFrame(animate);
  scene.children.forEach(cube => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
});
renderer.render(scene, camera);
}

animate(); */