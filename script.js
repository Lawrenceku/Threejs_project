/* const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('myCanvas') });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(0, 10, 0),
        new THREE.Vector3(10, 0, 0)
      ]);
      const line = new THREE.Line(geometry, material);
      scene.add(line);

      camera.position.z = 20;

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      animate(); */

     /*  const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('myCanvas') });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.05;
        cube.rotation.y += 0.05;
        renderer.render(scene, camera);
      }

      animate(); */
      const scene = new THREE.Scene();
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
      
      animate();
      
          
