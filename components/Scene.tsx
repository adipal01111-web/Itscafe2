"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import BurgerModel from "./BurgerModel";

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 1.1, 6.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#FFE8D0"
      />
      <pointLight position={[-4, 1, -3]} intensity={0.6} color="#FF5A33" />
      <pointLight position={[3, -1, 3]} intensity={0.35} color="#C6FF4D" />

      <BurgerModel />

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.5}
        scale={10}
        blur={2.2}
        far={3}
        color="#000000"
      />
      <Environment preset="city" />
    </Canvas>
  );
}
