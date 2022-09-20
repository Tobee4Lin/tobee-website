import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
// import Exhibition from "./src/Exhibition";
function Model() {
  const FbxObj = () => {
    const fbx = useFBX("/model/Offensive-Idle.fbx");
    return <primitive object={fbx} />;
  };
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5}></ambientLight>
      {/* <Exhibition /> */}
      {/* <FbxObj /> */}
    </Canvas>
  );
}

export default Model;
