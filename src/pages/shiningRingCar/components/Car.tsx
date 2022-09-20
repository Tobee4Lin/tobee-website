import React, { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

const Car = () => {
  const { scene } = useGLTF("/model/Chevrolet/model.glb");
  // const { scene } = useGLTF("/model/Porsche/911-transformed.glb");

  useEffect(() => {
    scene.scale.set(0.005, 0.005, 0.005);
    scene.position.set(0, -0.035, 0);

    // scene.position.set(0, 0.55, 0);

    scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const group = scene.children[0].children[0].children[0];
    group.children[0].rotation.x = t * 2;
    group.children[2].rotation.x = t * 2;
    group.children[4].rotation.x = t * 2;
    group.children[6].rotation.x = t * 2;
  });

  return <primitive object={scene} />;
};

export default Car;
