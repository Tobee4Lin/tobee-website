import { useMemo, useRef } from "react";
import { useConst } from "@chakra-ui/react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { Vector3 } from "three";

import "@/types/customTextGeometry.d.ts";

function Message({ message }: MyMessageProps) {
  const ref = useRef<THREE.Mesh>(null!);
  //   const { color, text } = useControls({ color: "aqua", text: message });
  const font = useLoader(FontLoader, "/typefaces/optimer_bold.typeface.json");
  const config = useMemo(() => ({ font, size: 9, height: 0.5 }), [font]);
  // useLayoutEffect(() => {
  //   ref.current?.geometry.center();
  // }, [message]);

  const Intro = () => {
    const vec = useConst(() => new Vector3());
    return useFrame((state) => {
      state.camera.position.lerp(vec.set(state.mouse.x * 1.5, 3 + 0, 16), 0.05);
      state.camera.lookAt(0, 2, 0);
    });
  };

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
      <ambientLight intensity={0.66} />
      <pointLight position={[10, 10, 10]} color="yellow" />
      <Text />
      <Intro />
    </Canvas>
  );
}

export default Message;
