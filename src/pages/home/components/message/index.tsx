import React, { useLayoutEffect, useMemo, useRef } from "react";
import {
  // OrbitControls,
  PresentationControls,
  // Html,
  // Environment,
  // ContactShadows,
} from "@react-three/drei";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import "@/types/customTextGeometry.d.ts";

function Message({ message }: MyMessageProps) {
  const ref = useRef<THREE.Mesh>(null!);
  //   const { color, text } = useControls({ color: "aqua", text: message });
  const font = useLoader(FontLoader, "/typefaces/optimer_bold.typeface.json");
  const config = useMemo(() => ({ font, size: 9, height: 0.5 }), [font]);
  // useLayoutEffect(() => {
  //   ref.current?.geometry.center();
  // }, [message]);

  const Text = () => {
    useFrame(({ clock }) => {
      ref.current?.geometry.center();
      // ref.current.rotation.y = Math.sin(clock.getElapsedTime());
    });
    return (
      <mesh ref={ref}>
        <customTextGeometry args={[message, config]} />
        <meshStandardMaterial color="aqua" />
      </mesh>
    );
  };
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75, near: 0.1, far: 1000 }}
      dpr={[1, 2]}
      flat
    >
      {/* <OrbitControls
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
      </mesh> */}
      {/* <Environment preset="apartment" background /> */}

      <PresentationControls
        global
        zoom={0.8}
        // rotation={[0, -Math.PI / 4, 0]}
        polar={[0, -Math.PI / 4]}
        azimuth={[-Math.PI / 30, Math.PI / 30]}
      >
        <ambientLight intensity={0.66} />
        <pointLight position={[10, 10, 10]} color="yellow" />
        {/* <mesh ref={ref}>
          <customTextGeometry args={[message, config]} />
          <meshStandardMaterial color="aqua" />
        </mesh> */}
        <Text />
        {/* <ContactShadows
          frames={30}
          position={[0, -5, 0]}
          scale={50}
          blur={10}
          far={20}
        /> */}
      </PresentationControls>
    </Canvas>
  );
}

export default Message;
