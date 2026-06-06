import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DiamondRing({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
  const ringRef = useRef<THREE.Group>(null);
  const diamondRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ringRef.current && diamondRef.current) {
      // Mouse reaction - smooth follow
      const targetRotationY = mousePosition.x * 0.8;
      const targetRotationX = mousePosition.y * 0.4;

      ringRef.current.rotation.y += (targetRotationY - ringRef.current.rotation.y) * 0.05;
      ringRef.current.rotation.x += (targetRotationX - ringRef.current.rotation.x) * 0.05;

      // Scroll reaction - rotate
      ringRef.current.rotation.z = scrollY * 0.002;

      // Diamond spin
      diamondRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={ringRef} position={[0, 0, 0]}>
        {/* Gold Band */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[1.2, 0.12, 32, 100]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={1}
            roughness={0.15}
          />
        </mesh>

        {/* Main Diamond */}
        <mesh ref={diamondRef} position={[0, 0.35, 0]}>
          <octahedronGeometry args={[0.35, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            resolution={512}
            transmission={0.95}
            roughness={0.05}
            thickness={0.5}
            ior={2.4}
            chromaticAberration={0.06}
            color="#ffffff"
          />
        </mesh>

        {/* Accent diamonds */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos(i * 0.5 + 0.3) * 1.2,
              0.15,
              Math.sin(i * 0.5 + 0.3) * 1.2
            ]}
          >
            <octahedronGeometry args={[0.06, 0]} />
            <MeshTransmissionMaterial
              backside
              samples={8}
              resolution={256}
              transmission={0.95}
              roughness={0}
              thickness={0.15}
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
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#ffffff" />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={2} color="#d4af37" />

      <DiamondRing mousePosition={mousePosition} scrollY={scrollY} />

      <Sparkles
        count={80}
        scale={6}
        size={2}
        speed={0.3}
        opacity={0.6}
        color="#d4af37"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
}

export default function Ring3D({ mousePosition, scrollY }: { mousePosition: { x: number; y: number }; scrollY: number }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
