import React, { useLayoutEffect, useMemo, useRef } from "react";
import { OrbitControls, Html, Environment } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import "@/types/customTextGeometry.d.ts";

function Message({ message }: MyMessageProps) {
  const ref = useRef<THREE.Mesh>(null!);
  ref.current?.geometry.center();
  //   const { color, text } = useControls({ color: "aqua", text: message });
  const font = useLoader(FontLoader, "/typefaces/optimer_bold.typeface.json");
  const config = useMemo(() => ({ font, size: 10, height: 1 }), [font]);
  useLayoutEffect(() => {
    ref.current?.geometry.center();
    console.log(message, "message1");
  }, [message]);
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75, near: 0.1, far: 1000 }}
      dpr={[1, 2]}
    >
      <OrbitControls
        maxAzimuthAngle={Math.PI * (10 / 180)}
        minAzimuthAngle={-Math.PI * (10 / 180)}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        maxDistance={25}
        minDistance={20}
      />
      <ambientLight intensity={0.66} />
      <pointLight position={[10, 10, 10]} color="yellow" />
      <mesh ref={ref}>
        <customTextGeometry args={[message, config]} />
        <meshStandardMaterial color="aqua" />
      </mesh>
      {/* <Environment preset="apartment" background /> */}
    </Canvas>
  );
}

export default Message;
