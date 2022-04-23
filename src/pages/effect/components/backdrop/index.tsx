import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Effects from "../effect";
import Scene from "../scene";

export default function Backdrop() {
  const dof = useRef();
  return (
    <Canvas
      className="canvas-container"
      orthographic
      gl={{
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        alpha: false,
        depth: false,
      }}
      camera={{ zoom: 5, position: [0, 0, 200], far: 300, near: 0 }}
      style={{ minHeight: "100vh" }}
    >
      <Suspense fallback={null}>
        <Scene dof={dof} />
      </Suspense>
      <Effects ref={dof} />
    </Canvas>
  );
}
