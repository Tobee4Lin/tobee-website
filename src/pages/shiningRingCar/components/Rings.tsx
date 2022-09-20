import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Color } from "three";

const Rings = () => {
  const itemsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    let elapsed = state.clock.getElapsedTime();

    for (let i = 0; i < itemsRef.current.length; i++) {
      const mesh = itemsRef.current[i];
      const z = (i - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2;
      const dist = Math.abs(z);
      mesh.position.set(0, 0, -z);
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04);

      let colorScale = 1;
      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10;
      }
      colorScale *= 0.5;

      if (i % 2 == 1) {
        (mesh.material as THREE.MeshStandardMaterial).emissive = new Color(
          6,
          0.15,
          0.7
        ).multiplyScalar(colorScale);
      } else {
        (mesh.material as THREE.MeshStandardMaterial).emissive = new Color(
          0.1,
          0.7,
          3
        ).multiplyScalar(colorScale);
      }
    }
  });

  return (
    <>
      {Array.from({ length: 15 }).map((v, i) => {
        return (
          <mesh
            castShadow
            receiveShadow
            position={[0, 0, 0]}
            key={i}
            ref={(el) => {
              itemsRef.current[i] = el!;
            }}
          >
            <torusGeometry args={[3.35, 0.05, 16, 100]}></torusGeometry>
            <meshStandardMaterial emissive={[4, 0.1, 0.4]} color={[0, 0, 0]} />
          </mesh>
        );
      })}
    </>
  );
};

export default Rings;
