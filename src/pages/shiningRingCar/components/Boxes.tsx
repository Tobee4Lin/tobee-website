import { useRef, useState } from "react";
import { useConst } from "@chakra-ui/react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const getInitialPosition = () => {
  let v = new Vector3(
    (Math.random() * 2 - 1) * 3,
    Math.random() * 2.5 + 0.1,
    (Math.random() * 2 - 1) * 15
  );
  if (v.x < 0) v.x -= 1.75;
  if (v.x > 0) v.x += 1.75;

  return v;
};

function Box({ color }: { color: any }) {
  const box = useRef<THREE.Mesh>(null!);
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const xRotSpeed = useConst(() => Math.random());
  const yRotSpeed = useConst(() => Math.random());
  const scale = useConst(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

  const resetPosition = () => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;

    setPosition(v);
  };

  useFrame(
    (state, delta) => {
      time.current += delta * 1.2;
      let newZ = position.z - time.current;

      if (newZ < -10) {
        resetPosition();
        time.current = 0;
      }

      box.current.position.set(position.x, position.y, newZ);
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    }
    // [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh ref={box} rotation-x={Math.PI * 0.5} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial args={color} envMapIntensity={0.15} />
    </mesh>
  );
}

const Boxes = () => {
  return (
    <>
      {Array.from({ length: 100 }).map((_, i) => (
        <Box
          key={i}
          color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  );
};

export default Boxes;
