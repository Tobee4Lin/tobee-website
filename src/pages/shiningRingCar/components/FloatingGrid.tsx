import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { RepeatWrapping, TextureLoader } from "three";

const FloatingGrid = () => {
  // const diffUse = useTexture("/texture/shiningCar/grid-texture.png");
  const diffUse = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/texture/shiningCar/grid-texture.png"
  );

  useEffect(() => {
    diffUse.wrapS = RepeatWrapping;
    diffUse.wrapT = RepeatWrapping;
    diffUse.anisotropy = 4;
    diffUse.repeat.set(30, 30);
    diffUse.offset.set(0, 0);
  }, [diffUse]);

  useFrame((state, delta) => {
    const t = -state.clock.getElapsedTime() * 0.68;
    diffUse.offset.set(0, t);
  });

  return (
    <>
      <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.005, 0]}>
        <planeGeometry args={[35, 35]} />
        <meshBasicMaterial
          color={[1, 1, 1]}
          opacity={0.15}
          map={diffUse}
          alphaMap={diffUse}
          transparent={true}
        />
      </mesh>
    </>
  );
};

export default FloatingGrid;
