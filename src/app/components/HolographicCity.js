import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import styles from '../styles/HolographicCity.module.css';


const HolographicCity = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    // Store a reference to the current DOM node to use in cleanup
    const currentMount = mountRef.current;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (currentMount.childElementCount > 0) {
      currentMount.removeChild(currentMount.childNodes[0]);
    }

    currentMount.appendChild(renderer.domElement);
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00fffc, 1, 100);
    pointLight.position.set(10, 15, 10);
    scene.add(pointLight);

    const buildingMaterial = new THREE.MeshBasicMaterial({
      color: 0x00fffc,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });

    const createCity = () => {
      const city = new THREE.Group();
      for (let i = 0; i < 50; i++) {
        const width = Math.random() * 2 + 0.5;
        const height = Math.random() * 8 + 2;
        const depth = Math.random() * 2 + 0.5;
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const building = new THREE.Mesh(geometry, buildingMaterial);
        const gridSize = 30;
        const x = Math.random() * gridSize - gridSize / 2;
        const z = Math.random() * gridSize - gridSize / 2;
        building.position.set(x, height / 2, z);
        city.add(building);
      }
      return city;
    };

    const city = createCity();
    scene.add(city);

    const gridHelper = new THREE.GridHelper(60, 60, 0x00fffc, 0x00fffc);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add(gridHelper);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersectedObject = null;

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, false);

    const animate = () => {
      requestAnimationFrame(animate);
      city.rotation.y += 0.001;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(city.children, true);

      if (intersects.length > 0) {
        if (intersectedObject !== intersects[0].object) {
          if (intersectedObject) intersectedObject.material.color.set(0x00fffc);
          intersectedObject = intersects[0].object;
          intersectedObject.material.color.set(0xff00ff);
        }
      } else {
        if (intersectedObject) {
          intersectedObject.material.color.set(0x00fffc);
          intersectedObject = null;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, false);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={styles.holographicCity} />;
};

export default HolographicCity;