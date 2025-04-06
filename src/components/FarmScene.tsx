
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FarmSceneProps {
  className?: string;
}

const FarmScene = ({ className = "" }: FarmSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // Setup and animate the 3D scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Set background color to a soft sky blue
    scene.background = new THREE.Color(0xE6F3FF);
    
    const camera = new THREE.PerspectiveCamera(
      60, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Create ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7CBA74, 
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create simple farm buildings
    createBuilding(scene, -5, 0, -5, 3, 2, 4, 0xA65E2E); // Barn
    createBuilding(scene, 5, 0, -8, 4, 3, 2, 0xFFFFFF); // Farmhouse

    // Create crop fields
    createCropField(scene, -8, -0.4, 0, 6, 6, 0x4CAF50); // Green field
    createCropField(scene, 0, -0.4, 3, 5, 5, 0xFFEB3B); // Yellow field (corn)
    createCropField(scene, 7, -0.4, 2, 4, 4, 0xFF9800); // Orange field (pumpkins)

    // Add some trees
    createTree(scene, -10, 0, -10);
    createTree(scene, 10, 0, -12);
    createTree(scene, -12, 0, 5);
    createTree(scene, 12, 0, 8);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Add subtle movement to the scene
      if (sceneRef.current) {
        sceneRef.current.rotation.y += 0.0005;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);
  
  // Helper function to create a simple building
  const createBuilding = (
    scene: THREE.Scene,
    x: number, 
    y: number, 
    z: number, 
    width: number, 
    height: number, 
    depth: number, 
    color: number
  ) => {
    // Building body
    const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.set(x, y + height / 2, z);
    building.castShadow = true;
    building.receiveShadow = true;
    scene.add(building);

    // Simple roof
    const roofGeometry = new THREE.ConeGeometry(Math.max(width, depth) / 1.5, height / 2, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(x, y + height + height / 4, z);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    scene.add(roof);
  };

  // Helper function to create a crop field
  const createCropField = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    color: number
  ) => {
    const fieldGeometry = new THREE.PlaneGeometry(width, depth);
    const fieldMaterial = new THREE.MeshStandardMaterial({ 
      color,
      roughness: 0.9,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
    field.rotation.x = -Math.PI / 2;
    field.position.set(x, y, z);
    field.receiveShadow = true;
    scene.add(field);

    // Add some crop rows
    const rowCount = 5;
    const rowSpacing = width / rowCount;
    
    for (let i = 0; i < rowCount; i++) {
      const rowX = x - width / 2 + rowSpacing / 2 + i * rowSpacing;
      
      const rowGeometry = new THREE.BoxGeometry(0.2, 0.1, depth);
      const rowMaterial = new THREE.MeshStandardMaterial({ color: 0x5D4037 });
      const row = new THREE.Mesh(rowGeometry, rowMaterial);
      row.position.set(rowX, y + 0.05, z);
      row.castShadow = true;
      scene.add(row);

      // Add crop plants along each row
      const plantCount = 8;
      const plantSpacing = depth / plantCount;
      
      for (let j = 0; j < plantCount; j++) {
        const plantZ = z - depth / 2 + plantSpacing / 2 + j * plantSpacing;
        
        const plantGeometry = new THREE.ConeGeometry(0.3, 0.6, 6);
        const plantMaterial = new THREE.MeshStandardMaterial({ color });
        const plant = new THREE.Mesh(plantGeometry, plantMaterial);
        plant.position.set(rowX, y + 0.3, plantZ);
        plant.castShadow = true;
        scene.add(plant);
      }
    }
  };

  // Helper function to create a simple tree
  const createTree = (scene: THREE.Scene, x: number, y: number, z: number) => {
    // Tree trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 1.5, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y + 0.75, z);
    trunk.castShadow = true;
    scene.add(trunk);

    // Tree foliage
    const foliageGeometry = new THREE.SphereGeometry(1.2, 8, 8);
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x2E7D32 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.set(x, y + 2.1, z);
    foliage.castShadow = true;
    scene.add(foliage);
  };

  return (
    <div 
      ref={containerRef} 
      className={`three-scene ${className}`}
    />
  );
};

export default FarmScene;
