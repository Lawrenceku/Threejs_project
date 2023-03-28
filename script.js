const scene = new THREE.Scene();
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

      animate();