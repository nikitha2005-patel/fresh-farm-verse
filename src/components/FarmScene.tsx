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
    
    // Set background color to represent clear blue sky
    scene.background = new THREE.Color(0xADD8E6);
    
    const camera = new THREE.PerspectiveCamera(
      70, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 6, 14);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add enhanced lighting for more realism
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xFDB813, 1); // Warm sunlight color
    directionalLight.position.set(5, 15, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);
    
    // Add secondary light for softer shadows
    const fillLight = new THREE.DirectionalLight(0xC9E9F6, 0.4); // Soft blue sky reflection
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);
    
    // Create more realistic terrain
    const groundGeometry = new THREE.PlaneGeometry(80, 80, 64, 64);
    
    // Add some subtle height variation to the ground
    const vertices = groundGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      // Skip the center area to keep it relatively flat for farming
      const x = vertices[i];
      const z = vertices[i + 2];
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      
      if (distanceFromCenter > 10) {
        // Add some gentle hills in the distance
        vertices[i + 1] = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2;
      } else {
        // Small variations for field texture
        vertices[i + 1] = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.1;
      }
    }
    
    // Create ground with different farming sections
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7CBA74, 
      roughness: 0.8,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create a distant mountain backdrop
    createMountainRange(scene, 0, 10, -40, 100, 15);
    
    // Create diverse crop fields
    // Rice paddy (green with water reflections)
    createRicePaddyField(scene, -15, -0.3, -8, 12, 10);
    
    // Wheat field (golden)
    createCropField(scene, 5, -0.4, -10, 15, 12, 0xE2C36D);
    
    // Vegetable plots (mixed colors)
    createVegetableField(scene, -8, -0.4, 8, 10, 8);
    
    // Fruit orchard
    createOrchard(scene, 12, -0.4, 8, 14, 10);
    
    // Add traditional Indian farm buildings
    createTraditionalFarmhouse(scene, -2, 0, -2);
    
    // Add water feature (small pond or irrigation canal)
    createWaterFeature(scene, 0, -0.4, 10, 6, 4);
    
    // Add some trees scattered around
    createIndianTree(scene, -20, 0, -15, 2.5);
    createIndianTree(scene, 22, 0, -18, 3);
    createIndianTree(scene, -18, 0, 15, 2.2);
    createIndianTree(scene, 18, 0, 16, 2.8);
    createIndianTree(scene, 25, 0, 0, 3.2);
    createIndianTree(scene, -25, 0, 5, 2.6);
    
    // Add farming equipment
    createTractor(scene, 8, 0, 0);
    
    // Add some people/farmers (simplified representations)
    createFarmer(scene, -5, 0, 5);
    createFarmer(scene, 3, 0, -5);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Add subtle movement to the scene - gentle rotation for exploration
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
  
  // Create a traditional Indian farmhouse
  const createTraditionalFarmhouse = (
    scene: THREE.Scene,
    x: number, 
    y: number, 
    z: number
  ) => {
    // Main house structure
    const houseGeometry = new THREE.BoxGeometry(4, 2.5, 5);
    const houseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xE1C16E,  // Earthy clay color
      roughness: 0.9,
      metalness: 0.1
    });
    const house = new THREE.Mesh(houseGeometry, houseMaterial);
    house.position.set(x, y + 1.25, z);
    house.castShadow = true;
    house.receiveShadow = true;
    scene.add(house);
    
    // Traditional sloped roof
    const roofGeometry = new THREE.ConeGeometry(4, 2, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,  // Brown thatch
      roughness: 1.0,
      metalness: 0
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(x, y + 3.5, z);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    scene.add(roof);
    
    // Small courtyard/veranda
    const verandaGeometry = new THREE.BoxGeometry(6, 0.2, 2);
    const verandaMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD2B48C,
      roughness: 0.7
    });
    const veranda = new THREE.Mesh(verandaGeometry, verandaMaterial);
    veranda.position.set(x, y + 0.1, z + 3.5);
    veranda.receiveShadow = true;
    scene.add(veranda);
    
    // Veranda pillars
    for (let i = -1; i <= 1; i += 2) {
      const pillarGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
      const pillarMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,
        roughness: 0.8
      });
      const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillar.position.set(x + (i * 2.5), y + 1, z + 3.5);
      pillar.castShadow = true;
      scene.add(pillar);
    }
    
    // Small windows
    for (let i = -1; i <= 1; i += 2) {
      const windowGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
      const windowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4682B4,
        roughness: 0.3,
        metalness: 0.8
      });
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(x + (i * 1.5), y + 1.5, z + 2.505);
      scene.add(window);
      
      // Window on side
      const sideWindow = new THREE.Mesh(windowGeometry, windowMaterial);
      sideWindow.position.set(x + 2.05, y + 1.5, z + (i * 1.5));
      sideWindow.rotation.y = Math.PI / 2;
      scene.add(sideWindow);
    }
    
    // Door
    const doorGeometry = new THREE.BoxGeometry(1.2, 2, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513,
      roughness: 0.9
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(x, y + 1, z + 2.55);
    scene.add(door);
    
    // Small storage structure
    const storageGeometry = new THREE.BoxGeometry(2, 2, 2);
    const storageMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD2B48C,
      roughness: 0.9
    });
    const storage = new THREE.Mesh(storageGeometry, storageMaterial);
    storage.position.set(x - 4, y + 1, z + 1);
    storage.castShadow = true;
    storage.receiveShadow = true;
    scene.add(storage);
    
    // Small storage roof
    const storageRoofGeometry = new THREE.ConeGeometry(2, 1, 4);
    const storageRoof = new THREE.Mesh(storageRoofGeometry, roofMaterial);
    storageRoof.position.set(x - 4, y + 2.5, z + 1);
    storageRoof.rotation.y = Math.PI / 4;
    storageRoof.castShadow = true;
    scene.add(storageRoof);
  };
  
  // Create mountain range in the background
  const createMountainRange = (
    scene: THREE.Scene,
    x: number, 
    y: number, 
    z: number,
    width: number,
    height: number
  ) => {
    const mountainGeometry = new THREE.BufferGeometry();
    const vertices = [];
    const segments = 100;
    
    // Create a series of triangles to form a mountain silhouette
    for (let i = 0; i < segments; i++) {
      const xPos = (i / segments) * width - width/2;
      const nextXPos = ((i+1) / segments) * width - width/2;
      
      // Base points
      vertices.push(xPos + x, y, z);
      vertices.push(nextXPos + x, y, z);
      
      // Calculate mountain height using noise-like function for variation
      const mountainHeight = Math.sin(i * 0.15) * 0.5 + Math.sin(i * 0.3) * 0.3 + Math.sin(i * 0.7) * 0.2;
      const peakHeight = y + height * (0.4 + mountainHeight * 0.6);
      
      // Peak point
      vertices.push(xPos + (nextXPos - xPos)/2 + x, peakHeight, z);
    }
    
    mountainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    mountainGeometry.computeVertexNormals();
    
    const mountainMaterial = new THREE.MeshStandardMaterial({
      color: 0x6B8E23,  // Olive green for distant hills
      roughness: 1.0,
      metalness: 0.1,
      flatShading: true
    });
    
    const mountains = new THREE.Mesh(mountainGeometry, mountainMaterial);
    scene.add(mountains);
    
    // Add snow caps to taller peaks
    const snowcapGeometry = new THREE.BufferGeometry();
    const snowVertices = [];
    
    for (let i = 0; i < segments; i++) {
      const xPos = (i / segments) * width - width/2;
      const nextXPos = ((i+1) / segments) * width - width/2;
      
      // Calculate mountain height using the same function
      const mountainHeight = Math.sin(i * 0.15) * 0.5 + Math.sin(i * 0.3) * 0.3 + Math.sin(i * 0.7) * 0.2;
      const peakHeight = y + height * (0.4 + mountainHeight * 0.6);
      
      // Only add snow to taller peaks
      if (mountainHeight > 0.6) {
        const midPoint = xPos + (nextXPos - xPos)/2 + x;
        
        // Base points of snow cap triangle
        snowVertices.push(midPoint - 1.5, peakHeight - 1, z - 0.1);
        snowVertices.push(midPoint + 1.5, peakHeight - 1, z - 0.1);
        
        // Peak point
        snowVertices.push(midPoint, peakHeight, z - 0.1);
      }
    }
    
    if (snowVertices.length > 0) {
      snowcapGeometry.setAttribute('position', new THREE.Float32BufferAttribute(snowVertices, 3));
      snowcapGeometry.computeVertexNormals();
      
      const snowMaterial = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        roughness: 0.8,
        metalness: 0.2
      });
      
      const snowcaps = new THREE.Mesh(snowcapGeometry, snowMaterial);
      scene.add(snowcaps);
    }
  };
  
  // Create rice paddy field with water
  const createRicePaddyField = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number
  ) => {
    // Water base for the paddy
    const waterGeometry = new THREE.PlaneGeometry(width, depth);
    const waterMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x6BAED6,  // Light blue water
      roughness: 0.1,
      metalness: 0.8,
      side: THREE.DoubleSide
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.set(x, y, z);
    water.receiveShadow = true;
    scene.add(water);
    
    // Rice plant rows
    const rowCount = 7;
    const rowSpacing = width / rowCount;
    
    for (let i = 0; i < rowCount; i++) {
      const rowX = x - width / 2 + rowSpacing / 2 + i * rowSpacing;
      
      // Plant counts vary by row for natural appearance
      const plantCount = 8 + Math.floor(Math.random() * 5);
      const plantSpacing = depth / plantCount;
      
      for (let j = 0; j < plantCount; j++) {
        const plantZ = z - depth / 2 + plantSpacing / 2 + j * plantSpacing;
        const plantY = y + 0.1; // Slightly above water
        
        // Rice plant group
        const stemCount = 3 + Math.floor(Math.random() * 4);
        for (let k = 0; k < stemCount; k++) {
          const offsetX = (Math.random() - 0.5) * 0.2;
          const offsetZ = (Math.random() - 0.5) * 0.2;
          const height = 0.4 + Math.random() * 0.3;
          
          // Rice stem
          const stemGeometry = new THREE.CylinderGeometry(0.02, 0.01, height, 4);
          const stemMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x90EE90, // Light green
            roughness: 0.9
          });
          const stem = new THREE.Mesh(stemGeometry, stemMaterial);
          stem.position.set(rowX + offsetX, plantY + height/2, plantZ + offsetZ);
          stem.castShadow = true;
          scene.add(stem);
          
          // Rice grain top
          const grainGeometry = new THREE.CylinderGeometry(0.04, 0.02, 0.15, 4);
          const grainMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xF0E68C, // Khaki/yellowish for rice grain
            roughness: 0.7
          });
          const grain = new THREE.Mesh(grainGeometry, grainMaterial);
          grain.position.set(rowX + offsetX, plantY + height + 0.075, plantZ + offsetZ);
          grain.castShadow = true;
          scene.add(grain);
        }
      }
    }
    
    // Add paddy field borders/ridges
    const borderGeometry = new THREE.BoxGeometry(width + 1, 0.3, 0.5);
    const borderMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513, // Brown
      roughness: 1.0
    });
    
    // North border
    const borderN = new THREE.Mesh(borderGeometry, borderMaterial);
    borderN.position.set(x, y, z - depth/2);
    borderN.receiveShadow = true;
    scene.add(borderN);
    
    // South border
    const borderS = new THREE.Mesh(borderGeometry, borderMaterial);
    borderS.position.set(x, y, z + depth/2);
    borderS.receiveShadow = true;
    scene.add(borderS);
    
    // East border
    const borderEGeometry = new THREE.BoxGeometry(0.5, 0.3, depth);
    const borderE = new THREE.Mesh(borderEGeometry, borderMaterial);
    borderE.position.set(x + width/2, y, z);
    borderE.receiveShadow = true;
    scene.add(borderE);
    
    // West border
    const borderW = new THREE.Mesh(borderEGeometry, borderMaterial);
    borderW.position.set(x - width/2, y, z);
    borderW.receiveShadow = true;
    scene.add(borderW);
  };
  
  // Create a more detailed crop field
  const createCropField = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    color: number
  ) => {
    // Base field
    const fieldGeometry = new THREE.PlaneGeometry(width, depth);
    const fieldMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513, // Brown soil
      roughness: 1.0,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
    field.rotation.x = -Math.PI / 2;
    field.position.set(x, y, z);
    field.receiveShadow = true;
    scene.add(field);
    
    // Crop rows
    const rowCount = 8;
    const rowSpacing = width / rowCount;
    
    for (let i = 0; i < rowCount; i++) {
      const rowX = x - width / 2 + rowSpacing / 2 + i * rowSpacing;
      
      // Create furrow/ridge for planting
      const furrowGeometry = new THREE.BoxGeometry(0.3, 0.1, depth);
      const furrowMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x6B4423, // Darker brown for soil ridge
        roughness: 0.9
      });
      const furrow = new THREE.Mesh(furrowGeometry, furrowMaterial);
      furrow.position.set(rowX, y + 0.05, z);
      scene.add(furrow);
      
      // Plant crops along each row
      const plantCount = 10 + Math.floor(Math.random() * 6);
      const plantSpacing = depth / plantCount;
      
      for (let j = 0; j < plantCount; j++) {
        const plantZ = z - depth / 2 + plantSpacing / 2 + j * plantSpacing;
        
        // Randomize plant appearance slightly
        const plantHeight = 0.5 + Math.random() * 0.3;
        const plantWidth = 0.2 + Math.random() * 0.1;
        
        // Create wheat/crop stalk
        const stalkGeometry = new THREE.CylinderGeometry(0.02, 0.01, plantHeight, 4);
        const stalkMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xD2B48C, // Tan stalk
          roughness: 0.8
        });
        const stalk = new THREE.Mesh(stalkGeometry, stalkMaterial);
        stalk.position.set(rowX, y + plantHeight/2 + 0.1, plantZ);
        stalk.castShadow = true;
        scene.add(stalk);
        
        // Create crop head/grain
        const grainGeometry = new THREE.CylinderGeometry(plantWidth, 0.05, 0.25, 5);
        const grainMaterial = new THREE.MeshStandardMaterial({ 
          color, // Passed color (e.g., golden for wheat)
          roughness: 0.7
        });
        const grain = new THREE.Mesh(grainGeometry, grainMaterial);
        grain.position.set(rowX, y + plantHeight + 0.2, plantZ);
        grain.castShadow = true;
        scene.add(grain);
      }
    }
  };
  
  // Create vegetable field with different plant types
  const createVegetableField = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number
  ) => {
    // Base soil field
    const fieldGeometry = new THREE.PlaneGeometry(width, depth);
    const fieldMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x5E2605, // Rich brown soil
      roughness: 0.9,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
    field.rotation.x = -Math.PI / 2;
    field.position.set(x, y, z);
    field.receiveShadow = true;
    scene.add(field);
    
    // Create different vegetable sections
    const sectionCount = 4;
    const sectionWidth = width / sectionCount;
    
    // Vegetable types with colors
    const vegetables = [
      { color: 0x228B22, height: 0.3, name: 'leafy' },   // Green leafy vegetables
      { color: 0xFF6347, height: 0.5, name: 'tomato' },  // Tomatoes
      { color: 0xFFA500, height: 0.4, name: 'carrot' },  // Carrots/orange veg
      { color: 0x800080, height: 0.6, name: 'brinjal' }  // Brinjal/eggplant
    ];
    
    for (let section = 0; section < sectionCount; section++) {
      const sectionX = x - width / 2 + sectionWidth / 2 + section * sectionWidth;
      const veg = vegetables[section % vegetables.length];
      
      // Create rows within each section
      const rowCount = 3;
      const rowSpacing = depth / rowCount;
      
      for (let row = 0; row < rowCount; row++) {
        const rowZ = z - depth / 2 + rowSpacing / 2 + row * rowSpacing;
        
        // Plants in each row
        const plantCount = 5;
        const plantSpacing = sectionWidth / plantCount;
        
        for (let plant = 0; plant < plantCount; plant++) {
          const plantX = sectionX - sectionWidth / 2 + plantSpacing / 2 + plant * plantSpacing;
          const plantY = y + 0.1;
          
          // Create plant based on type
          switch(veg.name) {
            case 'leafy':
              // Create leafy vegetable (like spinach or cabbage)
              createLeafyVegetable(scene, plantX, plantY, rowZ, veg.color);
              break;
            case 'tomato':
              // Create tomato plant
              createTomatoPlant(scene, plantX, plantY, rowZ, veg.color);
              break;
            case 'carrot':
              // Create carrot/root vegetable indicator
              createCarrotPlant(scene, plantX, plantY, rowZ, veg.color);
              break;
            case 'brinjal':
              // Create brinjal/eggplant
              createBrinjalPlant(scene, plantX, plantY, rowZ, veg.color);
              break;
          }
        }
      }
    }
  };
  
  // Create leafy vegetable
  const createLeafyVegetable = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    color: number
  ) => {
    // Create a cluster of leaves
    const leafCount = 5 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const radius = 0.2;
      const offsetX = Math.cos(angle) * radius;
      const offsetZ = Math.sin(angle) * radius;
      
      // Vary the leaf height
      const height = 0.15 + Math.random() * 0.2;
      
      const leafGeometry = new THREE.SphereGeometry(0.15, 8, 8);
      leafGeometry.scale(1, height, 1);
      
      const leafMaterial = new THREE.MeshStandardMaterial({ 
        color, 
        roughness: 0.8
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(x + offsetX, y + height/2, z + offsetZ);
      leaf.castShadow = true;
      scene.add(leaf);
    }
  };
  
  // Create tomato plant
  const createTomatoPlant = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    fruitColor: number
  ) => {
    // Plant stem
    const stemHeight = 0.6;
    const stemGeometry = new THREE.CylinderGeometry(0.03, 0.03, stemHeight, 5);
    const stemMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x228B22, // Green stem
      roughness: 0.8
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(x, y + stemHeight/2, z);
    stem.castShadow = true;
    scene.add(stem);
    
    // Foliage (leaves)
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const leafY = y + 0.2 + i * 0.15;
      const leafSize = 0.15;
      
      const leafGeometry = new THREE.SphereGeometry(leafSize, 8, 8);
      leafGeometry.scale(1, 0.5, 1);
      
      const leafMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x228B22, // Green
        roughness: 0.8 
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(
        x + Math.cos(angle) * 0.15,
        leafY,
        z + Math.sin(angle) * 0.15
      );
      leaf.castShadow = true;
      scene.add(leaf);
    }
    
    // Tomatoes
    const tomatoCount = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < tomatoCount; i++) {
      const angle = (i / tomatoCount) * Math.PI * 2;
      const tomatoRadius = 0.08 + Math.random() * 0.04;
      
      const tomatoGeometry = new THREE.SphereGeometry(tomatoRadius, 8, 8);
      const tomatoMaterial = new THREE.MeshStandardMaterial({ 
        color: fruitColor, // Red tomato
        roughness: 0.7
      });
      const tomato = new THREE.Mesh(tomatoGeometry, tomatoMaterial);
      tomato.position.set(
        x + Math.cos(angle) * 0.2,
        y + 0.3 + Math.random() * 0.3,
        z + Math.sin(angle) * 0.2
      );
      tomato.castShadow = true;
      scene.add(tomato);
    }
  };
  
  // Create carrot plant (visible leaves, carrot underground implied)
  const createCarrotPlant = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    rootColor: number
  ) => {
    // Leafy top
    const leafCount = 6 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < leafCount; i++) {
      const angle = (i / leafCount) * Math.PI * 2;
      const leafHeight = 0.2 + Math.random() * 0.15;
      
      const leafGeometry = new THREE.CylinderGeometry(0.01, 0.01, leafHeight, 3);
      const leafMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x228B22, // Green leafy tops
        roughness: 0.8
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      
      // Position and rotate the leaf to spread out
      leaf.position.set(
        x + Math.cos(angle) * 0.05,
        y + leafHeight/2,
        z + Math.sin(angle) * 0.05
      );
      
      // Tilt the leaves outward
      const tiltAxis = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      leaf.rotateOnAxis(tiltAxis, Math.PI/6);
      
      leaf.castShadow = true;
      scene.add(leaf);
    }
    
    // Hint of carrot top (small orange circle at soil level)
    const carrotTopGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 8);
    const carrotMaterial = new THREE.MeshStandardMaterial({ 
      color: rootColor, // Orange
      roughness: 0.8
    });
    const carrotTop = new THREE.Mesh(carrotTopGeometry, carrotMaterial);
    carrotTop.position.set(x, y + 0.01, z);
    scene.add(carrotTop);
  };
  
  // Create brinjal/eggplant
  const createBrinjalPlant = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    fruitColor: number
  ) => {
    // Plant stem
    const stemHeight = 0.7;
    const stemGeometry = new THREE.CylinderGeometry(0.04, 0.04, stemHeight, 5);
    const stemMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x556B2F, // Dark olive green
      roughness: 0.8
    });
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.set(x, y + stemHeight/2, z);
    stem.castShadow = true;
    scene.add(stem);
    
    // Leaves
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const leafY = y + 0.2 + i * 0.15;
      
      const leafGeometry = new THREE.CircleGeometry(0.2, 8);
      const leafMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3A5F0B, // Dark green
        roughness: 0.9,
        side: THREE.DoubleSide
      });
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(
        x + Math.cos(angle) * 0.2,
        leafY,
        z + Math.sin(angle) * 0.2
      );
      
      // Orient leaf to face outward from stem
      leaf.lookAt(new THREE.Vector3(
        x + Math.cos(angle) * 2,
        leafY,
        z + Math.sin(angle) * 2
      ));
      
      leaf.castShadow = true;
      scene.add(leaf);
    }
    
    // Brinjal/Eggplant fruit
    const brinjalGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    brinjalGeometry.scale(1, 1.8, 1); // Elongate for eggplant shape
    
    const brinjalMaterial = new THREE.MeshStandardMaterial({ 
      color: fruitColor, // Purple
      roughness: 0.7
    });
    const brinjal = new THREE.Mesh(brinjalGeometry, brinjalMaterial);
    brinjal.position.set(x + 0.15, y + 0.3, z + 0.05);
    brinjal.rotation.z = Math.PI/6; // Slight tilt
    brinjal.castShadow = true;
    scene.add(brinjal);
    
    // Add stem cap to eggplant
    const capGeometry = new THREE.ConeGeometry(0.08, 0.08, 5);
    const capMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x228B22, // Green cap
      roughness: 0.8
    });
    const cap = new THREE.Mesh(capGeometry, capMaterial);
    cap.position.set(x + 0.15, y + 0.6, z + 0.05);
    cap.castShadow = true;
    scene.add(cap);
  };
  
  // Create fruit orchard
  const createOrchard = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number
  ) => {
    // Base ground
    const groundGeometry = new THREE.PlaneGeometry(width, depth);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x7CBA74, // Grass green
      roughness: 0.8,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(x, y, z);
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create fruit trees in a grid
    const rowCount = 3;
    const colCount = 4;
    const rowSpacing = depth / rowCount;
    const colSpacing = width / colCount;
    
    // Fruit tree types (mango, apple, etc.)
    const fruitTypes = [
      { trunkColor: 0x8B4513, foliageColor: 0x228B22, fruitColor: 0xFFA500 }, // Orange/mango
      { trunkColor: 0x8B4513, foliageColor: 0x006400, fruitColor: 0xFF0000 }, // Apple
      { trunkColor: 0x8B4513, foliageColor: 0x228B22, fruitColor: 0xFFFF00 }, // Lemon/yellow fruit
    ];
    
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        const treeX = x - width / 2 + colSpacing / 2 + col * colSpacing;
        const treeZ = z - depth / 2 + rowSpacing / 2 + row * rowSpacing;
        
        // Alternate tree types
        const treeType = fruitTypes[(row + col) % fruitTypes.length];
        
        // Create fruit tree
        createFruitTree(
          scene, 
          treeX, 
          y, 
          treeZ, 
          treeType.trunkColor,
          treeType.foliageColor,
          treeType.fruitColor
        );
      }
    }
  };
  
  // Create a fruit tree
  const createFruitTree = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    trunkColor: number,
    foliageColor: number,
    fruitColor: number
  ) => {
    // Tree trunk
    const trunkHeight = 1.5;
    const trunkGeometry = new THREE.CylinderGeometry(0.15, 0.2, trunkHeight, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ 
      color: trunkColor, 
      roughness: 0.9
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y + trunkHeight / 2, z);
    trunk.castShadow = true;
    scene.add(trunk);
    
    // Tree foliage (several overlapping spheres)
    const foliageRadius = 1.0;
    for (let i = 0; i < 3; i++) {
      const foliageGeometry = new THREE.SphereGeometry(foliageRadius, 8, 8);
      const foliageMaterial = new THREE.MeshStandardMaterial({ 
        color: foliageColor,
        roughness: 0.8
      });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      
      // Position foliage at slightly different positions for fuller tree
      foliage.position.set(
        x + (Math.random() - 0.5) * 0.5,
        y + trunkHeight + foliageRadius * 0.7,
        z + (Math.random() - 0.5) * 0.5
      );
      foliage.castShadow = true;
      scene.add(foliage);
    }
    
    // Add fruits
    const fruitCount = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < fruitCount; i++) {
      // Distribute fruits around the tree
      const angle = (i / fruitCount) * Math.PI * 2;
      const radius = 0.6 + Math.random() * 0.3;
      const fruitX = x + Math.cos(angle) * radius;
      const fruitZ = z + Math.sin(angle) * radius;
      const fruitY = y + trunkHeight + Math.random() * 1.0;
      
      const fruitGeometry = new THREE.SphereGeometry(0.1, 6, 6);
      const fruitMaterial = new THREE.MeshStandardMaterial({ 
        color: fruitColor,
        roughness: 0.6
      });
      const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
      fruit.position.set(fruitX, fruitY, fruitZ);
      fruit.castShadow = true;
      scene.add(fruit);
    }
  };
  
  // Create water feature (pond/irrigation canal)
  const createWaterFeature = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number
  ) => {
    // Water surface
    const waterGeometry = new THREE.PlaneGeometry(width, depth);
    const waterMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4682B4, // Steel blue water
      roughness: 0.1,
      metalness: 0.8,
      side: THREE.DoubleSide
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.set(x, y + 0.05, z);
    scene.add(water);
    
    // Pond/canal banks
    const bankGeometry = new THREE.BoxGeometry(width + 0.5, 0.2, depth + 0.5);
    const bankMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513, // Brown soil
      roughness: 0.9,
      metalness: 0.1
    });
    const bank = new THREE.Mesh(bankGeometry, bankMaterial);
    bank.position.set(x, y, z);
    bank.receiveShadow = true;
    scene.add(bank);
    
    // Inner water area
    const innerWaterGeometry = new THREE.BoxGeometry(width, 0.1, depth);
    const innerWaterMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4682B4, // Water color
      roughness: 0.1,
      metalness: 0.8
    });
    const innerWater = new THREE.Mesh(innerWaterGeometry, innerWaterMaterial);
    innerWater.position.set(x, y + 0.05, z);
    scene.add(innerWater);
    
    // Add some water plants/lilies
    for (let i = 0; i < 5; i++) {
      const lilyX = x + (Math.random() - 0.5) * (width - 0.5);
      const lilyZ = z + (Math.random() - 0.5) * (depth - 0.5);
      
      const lilyGeometry = new THREE.CircleGeometry(0.2, 5);
      const lilyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x90EE90, // Light green
        roughness: 0.8,
        side: THREE.DoubleSide
      });
      const lily = new THREE.Mesh(lilyGeometry, lilyMaterial);
      lily.rotation.x = -Math.PI / 2;
      lily.position.set(lilyX, y + 0.1, lilyZ);
      scene.add(lily);
    }
  };
  
  // Create Indian-style tree (banyan-inspired)
  const createIndianTree = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number,
    scale: number = 1
  ) => {
    // Main trunk
    const trunkHeight = 2 * scale;
    const trunkRadius = 0.3 * scale;
    const trunkGeometry = new THREE.CylinderGeometry(
      trunkRadius * 0.8, 
      trunkRadius, 
      trunkHeight, 
      8
    );
    const trunkMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B4513, // Brown
      roughness: 0.9
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y + trunkHeight/2, z);
    trunk.castShadow = true;
    scene.add(trunk);
    
    // Large canopy
    const foliageCount = 4;
    for (let i = 0; i < foliageCount; i++) {
      const foliageRadius = (1.2 + Math.random() * 0.4) * scale;
      const offsetX = (Math.random() - 0.5) * scale;
      const offsetZ = (Math.random() - 0.5) * scale;
      const offsetY = (0.5 + Math.random() * 0.5) * scale;
      
      const foliageGeometry = new THREE.SphereGeometry(foliageRadius, 8, 8);
      const foliageMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x006400, // Dark green
        roughness: 0.8
      });
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
      foliage.position.set(
        x + offsetX, 
        y + trunkHeight - 0.5 + offsetY, 
        z + offsetZ
      );
      foliage.castShadow = true;
      scene.add(foliage);
    }
    
    // Add some aerial roots (for a banyan-like appearance)
    const rootCount = Math.floor(3 * scale);
    for (let i = 0; i < rootCount; i++) {
      const angle = (i / rootCount) * Math.PI * 2;
      const radius = 0.8 * scale;
      const rootHeight = (0.8 + Math.random() * 0.4) * trunkHeight * 0.7;
      
      const rootGeometry = new THREE.CylinderGeometry(0.05 * scale, 0.08 * scale, rootHeight, 5);
      const root = new THREE.Mesh(rootGeometry, trunkMaterial);
      
      root.position.set(
        x + Math.cos(angle) * radius,
        y + rootHeight/2,
        z + Math.sin(angle) * radius
      );
      
      // Tilt the roots slightly inward
      root.rotation.x = Math.random() * 0.2;
      root.rotation.z = Math.cos(angle) * 0.2;
      
      root.castShadow = true;
      scene.add(root);
    }
  };
  
  // Create a simple tractor
  const createTractor = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number
  ) => {
    // Tractor body
    const bodyGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFF0000, // Red tractor
      roughness: 0.7
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(x, y + 0.8, z);
    body.castShadow = true;
    scene.add(body);
    
    // Tractor cabin
    const cabinGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.7);
    const cabinMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333, // Dark gray
      roughness: 0.6
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(x - 0.1, y + 1.5, z);
    cabin.castShadow = true;
    scene.add(cabin);
    
    // Windows (simple blue rectangles)
    const windowMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x87CEEB,  // Sky blue
      roughness: 0.3,
      metalness: 0.5
    });
    
    // Front window
    const frontWindowGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.5);
    const frontWindow = new THREE.Mesh(frontWindowGeometry, windowMaterial);
    frontWindow.position.set(x - 0.4, y + 1.5, z);
    scene.add(frontWindow);
    
    // Front hood/engine
    const hoodGeometry = new THREE.BoxGeometry(0.7, 0.5, 0.7);
    const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
    hood.position.set(x + 0.5, y + 0.65, z);
    hood.castShadow = true;
    scene.add(hood);
    
    // Wheels (4)
    const wheelPositions = [
      {x: x - 0.4, y: y + 0.3, z: z + 0.45, radius: 0.3},  // back left
      {x: x - 0.4, y: y + 0.3, z: z - 0.45, radius: 0.3},  // back right
      {x: x + 0.6, y: y + 0.25, z: z + 0.4, radius: 0.25}, // front left
      {x: x + 0.6, y: y + 0.25, z: z - 0.4, radius: 0.25}  // front right
    ];
    
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,  // Dark gray/black
      roughness: 1.0
    });
    
    wheelPositions.forEach(pos => {
      const wheelGeometry = new THREE.CylinderGeometry(
        pos.radius, pos.radius, 0.2, 12
      );
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(pos.x, pos.y, pos.z);
      wheel.rotation.z = Math.PI / 2; // Rotate to correct orientation
      wheel.castShadow = true;
      scene.add(wheel);
      
      // Wheel hub/cap
      const hubGeometry = new THREE.CylinderGeometry(pos.radius * 0.3, pos.radius * 0.3, 0.21, 8);
      const hubMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 }); // Silver
      const hub = new THREE.Mesh(hubGeometry, hubMaterial);
      hub.position.set(pos.x, pos.y, pos.z);
      hub.rotation.z = Math.PI / 2;
      scene.add(hub);
    });
    
    // Exhaust pipe
    const exhaustGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6);
    const exhaustMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x808080,  // Gray
      roughness: 0.7
    });
    const exhaust = new THREE.Mesh(exhaustGeometry, exhaustMaterial);
    exhaust.position.set(x + 0.3, y + 1.1, z - 0.3);
    exhaust.castShadow = true;
    scene.add(exhaust);
  };
  
  // Create a farmer (simplified representation)
  const createFarmer = (
    scene: THREE.Scene,
    x: number,
    y: number,
    z: number
  ) => {
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.6, 8);
    const clothingColor = Math.random() > 0.5 ? 0x1E90FF : 0xFFB6C1; // Blue or pink
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: clothingColor,
      roughness: 0.8
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(x, y + 0.6, z);
    body.castShadow = true;
    scene.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xF5DEB3,  // Wheat/skin tone
      roughness: 0.8
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(x, y + 1.05, z);
    head.castShadow = true;
    scene.add(head);
    
    // Hat (traditional Indian farmer hat)
    const hatGeometry = new THREE.ConeGeometry(0.2, 0.15, 8);
    const hatMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD2B48C,  // Tan/straw color
      roughness: 1.0
    });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.set(x, y + 1.25, z);
    hat.castShadow = true;
    scene.add(hat);
    
    // Arms
    const armGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
    
    // Left arm
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(x - 0.2, y + 0.8, z);
    leftArm.rotation.z = Math.PI / 6;  // Angle arm slightly
    leftArm.castShadow = true;
    scene.add(leftArm);
    
    // Right arm
    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(x + 0.2, y + 0.8, z);
    rightArm.rotation.z = -Math.PI / 6;  // Angle arm slightly
    rightArm.castShadow = true;
    scene.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.BoxGeometry(0.12, 0.45, 0.12);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4682B4,  // Blue jeans/pants
      roughness: 0.8
    });
    
    // Left leg
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(x - 0.1, y + 0.22, z);
    leftLeg.castShadow = true;
    scene.add(leftLeg);
    
    // Right leg
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(x + 0.1, y + 0.22, z);
    rightLeg.castShadow = true;
    scene.add(rightLeg);
    
    // Farming tool (basic stick/rake)
    if (Math.random() > 0.5) {
      const toolHandleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1.0, 5);
      const toolHandleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,  // Brown
        roughness: 1.0
      });
      const toolHandle = new THREE.Mesh(toolHandleGeometry, toolHandleMaterial);
      toolHandle.position.set(x + 0.35, y + 0.6, z);
      toolHandle.rotation.z = -Math.PI / 12;
      toolHandle.castShadow = true;
      scene.add(toolHandle);
      
      // Tool head (rake/hoe)
      const toolHeadGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.3);
      const toolHeadMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x708090,  // Steel gray
        roughness: 0.7
      });
      const toolHead = new THREE.Mesh(toolHeadGeometry, toolHeadMaterial);
      toolHead.position.set(x + 0.35, y + 0.15, z);
      toolHead.rotation.z = -Math.PI / 12;
      toolHead.castShadow = true;
      scene.add(toolHead);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`three-scene ${className}`}
    />
  );
};

export default FarmScene;
