"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = null; // transparent to show body bg

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // ==========================================
    // LAYER 1: Medium Cell Spheres
    // ==========================================
    const spheresGroup = new THREE.Group();
    scene.add(spheresGroup);

    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      roughness: 0.2,
      transmission: 0.6,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });

    const spheresCount = 35;
    const spheresData: { mesh: THREE.Mesh; scaleOffset: number; baseScale: number }[] = [];

    for (let i = 0; i < spheresCount; i++) {
      const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * 28, // ±14
        (Math.random() - 0.5) * 20, // ±10
        (Math.random() - 0.5) * 20  // ±10
      );
      const baseScale = 0.15 + Math.random() * 0.7; // 0.15 ~ 0.85
      mesh.scale.set(baseScale, baseScale, baseScale);

      spheresGroup.add(mesh);
      spheresData.push({
        mesh,
        baseScale,
        scaleOffset: Math.random() * Math.PI * 2,
      });
    }

    // ==========================================
    // LAYER 2: Molecular Node Particles & Connections
    // ==========================================
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodesCount = 250;
    const nodesGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodesCount * 3);
    const nodeVelocities: THREE.Vector3[] = [];

    for (let i = 0; i < nodesCount; i++) {
      const radius = 18 + Math.random() * 14; // 18 ~ 32
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta) * 0.8;
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      const z = radius * Math.cos(phi) * 0.5;

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.014,
          (Math.random() - 0.5) * 0.014,
          (Math.random() - 0.5) * 0.014
        )
      );
    }

    nodesGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    // Custom shader for soft round points with distance fade
    const nodesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#1a9e96") },
      },
      vertexShader: `
        varying float vDistance;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vDistance = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
          
          float size = 1.8 + sin(position.x * 2.0) * 1.3; // 0.6 ~ 3.1 equivalent
          gl_PointSize = size * (100.0 / vDistance);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vDistance;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.2, dist);
          float fade = smoothstep(50.0, 20.0, vDistance); // fade by deep distance
          gl_FragColor = vec4(color, alpha * fade * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
    nodesGroup.add(nodesMesh);

    // Connection lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x2d7dd2, // Ocean Blue
      transparent: true,
      opacity: 0.06,
    });
    // Dynamic empty geometry for lines
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    nodesGroup.add(linesMesh);

    // ==========================================
    // LAYER 3: Fine Dust
    // ==========================================
    const dustCount = 800;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 110;     // ±55
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;  // ±40
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;  // ±30
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x6c5ce7, // Soft purple hint
      size: 0.4,
      transparent: true,
      opacity: 0.25,
      sizeAttenuation: true,
    });
    const dustMesh = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustMesh);

    // ==========================================
    // LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 15);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x1a9e96, 0.8, 50); // Teal
    pointLight1.position.set(-10, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6c5ce7, 0.5, 50); // Purple
    pointLight2.position.set(10, -5, 5);
    scene.add(pointLight2);

    // ==========================================
    // INTERACTION & ANIMATION MOUSE
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const onMouseMove = (event: MouseEvent) => {
      // Normalize mouse to -1 to 1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Affect range: X ±5, Y ±3.5
      targetCameraX = mouseX * 5;
      targetCameraY = mouseY * 3.5;
    };

    window.addEventListener("mousemove", onMouseMove);

    // ==========================================
    // RESIZE HANDLER
    // ==========================================
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize);

    // ==========================================
    // RENDER LOOP
    // ==========================================
    let time = 0;
    const clock = new THREE.Clock();

    // Arrays to hold dynamic line data
    const maxLineCount = 1500;
    const linePositions = new Float32Array(maxLineCount * 2 * 3);

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      time += delta;

      // Camera orbital movement (very slow)
      camera.position.x += (targetCameraX + Math.sin(time * 0.04) * 2 - camera.position.x) * 0.025;
      camera.position.y += (targetCameraY + Math.cos(time * 0.035) * 2 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      // Light movement
      pointLight1.position.x = Math.sin(time * 0.5) * 15 - 5;
      pointLight2.position.y = Math.cos(time * 0.3) * 10 - 2;

      // Spheres logic
      spheresData.forEach((sd) => {
        // slow rotation
        sd.mesh.rotation.x += 0.001;
        sd.mesh.rotation.y += 0.0015;

        // "breathing" scale ±8%
        const scaleMod = 1 + Math.sin(time * 2 + sd.scaleOffset) * 0.08;
        sd.mesh.scale.set(sd.baseScale * scaleMod, sd.baseScale * scaleMod, sd.baseScale * scaleMod);

        // slow movement back to center if outside
        if (sd.mesh.position.x > 15) sd.mesh.position.x -= 0.01;
        if (sd.mesh.position.x < -15) sd.mesh.position.x += 0.01;
        if (sd.mesh.position.y > 11) sd.mesh.position.y -= 0.01;
        if (sd.mesh.position.y < -11) sd.mesh.position.y += 0.01;
      });

      // Nodes logic (layer 2)
      const positions = nodesMesh.geometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < nodesCount; i++) {
        // move node
        const v = nodeVelocities[i];
        positions[i * 3] += v.x;
        positions[i * 3 + 1] += v.y;
        positions[i * 3 + 2] += v.z;

        // slight sine wave additive
        positions[i * 3 + 1] += Math.sin(time + i) * 0.002;

        // wrap around boundary loosely
        if (positions[i * 3] > 35) positions[i * 3] = -35;
        if (positions[i * 3] < -35) positions[i * 3] = 35;
        if (positions[i * 3 + 1] > 25) positions[i * 3 + 1] = -25;
        if (positions[i * 3 + 1] < -25) positions[i * 3 + 1] = 25;

        // Node <-> Node Lines
        for (let j = i + 1; j < nodesCount; j++) {
          if (lineIndex >= maxLineCount * 6) break;

          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 30.25) { // 5.5^2
            linePositions[lineIndex++] = positions[i * 3];
            linePositions[lineIndex++] = positions[i * 3 + 1];
            linePositions[lineIndex++] = positions[i * 3 + 2];
            linePositions[lineIndex++] = positions[j * 3];
            linePositions[lineIndex++] = positions[j * 3 + 1];
            linePositions[lineIndex++] = positions[j * 3 + 2];
          }
        }

        // Node <-> Sphere Lines
        for (let s = 0; s < spheresCount; s++) {
          if (lineIndex >= maxLineCount * 6) break;
          
          const spherePos = spheresData[s].mesh.position;
          const dx = positions[i * 3] - spherePos.x;
          const dy = positions[i * 3 + 1] - spherePos.y;
          const dz = positions[i * 3 + 2] - spherePos.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 64.0) { // 8^2
            linePositions[lineIndex++] = positions[i * 3];
            linePositions[lineIndex++] = positions[i * 3 + 1];
            linePositions[lineIndex++] = positions[i * 3 + 2];
            linePositions[lineIndex++] = spherePos.x;
            linePositions[lineIndex++] = spherePos.y;
            linePositions[lineIndex++] = spherePos.z;
          }
        }
      }

      // Sphere <-> Sphere Lines
      for (let s1 = 0; s1 < spheresCount; s1++) {
        for (let s2 = s1 + 1; s2 < spheresCount; s2++) {
          if (lineIndex >= maxLineCount * 6) break;
          
          const p1 = spheresData[s1].mesh.position;
          const p2 = spheresData[s2].mesh.position;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 100.0) { // 10^2
            linePositions[lineIndex++] = p1.x;
            linePositions[lineIndex++] = p1.y;
            linePositions[lineIndex++] = p1.z;
            linePositions[lineIndex++] = p2.x;
            linePositions[lineIndex++] = p2.y;
            linePositions[lineIndex++] = p2.z;
          }
        }
      }

      nodesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.setAttribute("position", new THREE.BufferAttribute(linePositions.slice(0, lineIndex), 3));
      
      // Dust logic (Layer 3)
      dustMesh.rotation.y = time * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
