"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

/**
 * Each layer of the burger is its own mesh with:
 *  - a "rest" position (stacked, closed burger)
 *  - an "exploded" offset (where it flies to at progress = 1)
 *  - its own spin axis, so the explosion doesn't read as a single
 *    uniform translation — every layer tumbles differently.
 *
 * We don't ship a .glb here so the component has zero external asset
 * dependencies; swap any mesh below for a <primitive object={gltf.scene}>
 * once you have a real model — the ref + lerp pattern stays identical.
 */

type LayerConfig = {
  name: string;
  rest: [number, number, number];
  exploded: [number, number, number];
  spin: [number, number, number];
  color: string;
  geometry: React.ReactNode;
};

const LAYERS: LayerConfig[] = [
  {
    name: "bun-top",
    rest: [0, 1.35, 0],
    exploded: [-0.9, 4.4, -0.6],
    spin: [0.6, 0.2, 0.1],
    color: "#D98A3D",
    geometry: <sphereGeometry args={[1.15, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />,
  },
  {
    name: "lettuce",
    rest: [0, 0.95, 0],
    exploded: [1.4, 2.6, 0.8],
    spin: [0.3, 0.8, 0.2],
    color: "#8FBF4D",
    geometry: <cylinderGeometry args={[1.22, 1.22, 0.12, 24, 1, false]} />,
  },
  {
    name: "tomato",
    rest: [0, 0.78, 0],
    exploded: [-1.6, 1.6, 1.1],
    spin: [0.2, 0.4, 0.6],
    color: "#C1392B",
    geometry: <cylinderGeometry args={[1.05, 1.05, 0.1, 24, 1, false]} />,
  },
  {
    name: "cheese",
    rest: [0, 0.6, 0],
    exploded: [1.7, 0.4, -1.3],
    spin: [0.7, 0.1, 0.3],
    color: "#F2C230",
    geometry: <boxGeometry args={[2.1, 0.06, 2.1]} />,
  },
  {
    name: "patty",
    rest: [0, 0.4, 0],
    exploded: [-1.3, -0.9, -0.9],
    spin: [0.4, 0.6, 0.1],
    color: "#5A3825",
    geometry: <cylinderGeometry args={[1.1, 1.1, 0.32, 24, 1, false]} />,
  },
  {
    name: "bun-bottom",
    rest: [0, 0, 0],
    exploded: [0.5, -3.4, 0.9],
    spin: [0.2, 0.3, 0.5],
    color: "#C97B33",
    geometry: <cylinderGeometry args={[1.15, 1.0, 0.55, 32]} />,
  },
];

function Layer({ cfg }: { cfg: LayerConfig }) {
  const ref = useRef<THREE.Mesh>(null);
  const restVec = useRef(new THREE.Vector3(...cfg.rest));
  const explodedVec = useRef(new THREE.Vector3(...cfg.exploded));

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = scrollStore.explode;
    const target = new THREE.Vector3().lerpVectors(restVec.current, explodedVec.current, t);
    ref.current.position.lerp(target, 1 - Math.pow(0.001, delta));

    // gentle idle bob + scroll-driven tumble
    ref.current.rotation.x += delta * cfg.spin[0] * t;
    ref.current.rotation.y += delta * (0.15 + cfg.spin[1] * t);
    ref.current.rotation.z += delta * cfg.spin[2] * t;
  });

  return (
    <mesh ref={ref} position={cfg.rest} castShadow receiveShadow>
      {cfg.geometry}
      <meshStandardMaterial color={cfg.color} roughness={0.55} metalness={0.05} />
    </mesh>
  );
}

export default function BurgerModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    // slow ambient turntable so the burger never feels static, even at rest
    group.current.rotation.y = state.clock.elapsedTime * 0.15;
    // whole assembly sinks slightly and fades toward the menu section
    group.current.position.y = -scrollStore.heroExit * 1.5;
  });

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {LAYERS.map((l) => (
        <Layer key={l.name} cfg={l} />
      ))}
    </group>
  );
}
