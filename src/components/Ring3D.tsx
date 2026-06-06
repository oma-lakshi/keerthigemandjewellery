import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function DiamondRing({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
  const ringRef = useRef<THREE.Group>(null);
  const diamondRef = useRef<THREE.Mesh>(null);

  const diamondGeometry = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(0.4, 0);
    return geo;
  }, []);

  useFrame((state) => {
    if (ringRef.current && diamondRef.current) {
      // React to mouse position
      const targetRotationY = mousePosition.x * 0.5;
      const targetRotationX = mousePosition.y * 0.3;

      ringRef.current.rotation.y += (targetRotationY - ringRef.current.rotation.y) * 0.1;
      ringRef.current.rotation.x += (targetRotationX - ringRef.current.rotation.x) * 0.1;

      // Slow rotation based on scroll
      ringRef.current.rotation.z = scrollY * 0.001;

      // Diamond sparkle rotation
      diamondRef.current.rotation.y += 0.02;
      diamondRef.current.rotation.x += 0.01;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group ref={ringRef} position={[0, 0, 0]}>
        {/* Gold Ring Band */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.5, 0.15, 32, 100]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={1}
            roughness={0.2}
            envMapIntensity={1}
          />
        </mesh>

        {/* Diamond (large) */}
        <mesh ref={diamondRef} position={[0, 0.4, 0]} geometry={diamondGeometry} scale={1}>
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={1}
            roughness={0.0}
            thickness={0.5}
            ior={2.4}
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#ffffff"
          />
        </mesh>

        {/* Small accent diamonds */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[Math.cos(i * 0.4) * 1.5, 0.2 + Math.sin(i * 0.4) * 0.3, Math.sin(i * 0.4) * 1.5]}>
            <octahedronGeometry args={[0.08, 0]} />
            <MeshTransmissionMaterial
              backside
              samples={8}
              resolution={256}
              transmission={1}
              roughness={0.0}
              thickness={0.2}
              ior={2.4}
              color="#ffffff"
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#d4af37"
      />
      <DiamondRing mousePosition={mousePosition} scrollY={scrollY} />
      <Sparkles
        count={100}
        scale={8}
        size={2}
        speed={0.4}
        opacity={0.5}
        color="#d4af37"
      />
      <Environment preset="studio" />
    </>
  );
}

export default function Ring3D({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
