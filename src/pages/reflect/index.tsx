import React, { Suspense, useState, useEffect } from "react";
import {
  Vector2,
  Vector3,
  Euler,
  RepeatWrapping,
  sRGBEncoding,
  LinearEncoding,
  TextureLoader,
} from "three";
import type { Object3D } from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Reflector,
  Text,
  useTexture,
  useGLTF,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { Box } from "@chakra-ui/react";
import Overlay from "./components/overlay";
import "./index.less";

const Carla = (props: Partial<Object3D>) => {
  const { scene } = useGLTF("/model/reflect/carla-draco.glb");
  return <primitive object={scene} {...props} />;
};

// @ts-ignore
const VideoText = ({ clicked, ...props }) => {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/music/drei.mp4",
      crossOrigin: "Anonymous",
      loop: true,
    })
  );
  useEffect(() => void (clicked && video.play()), [video, clicked]);
  return (
    <Text
      font="/texture/reflect/Inter-Bold.woff"
      fontSize={3}
      letterSpacing={-0.06}
      {...props}
    >
      Tobee
      <meshBasicMaterial toneMapped={false}>
        <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  );
};

const Ground = () => {
  const [floor, normal] = useLoader(TextureLoader, [
    "texture/reflect/SurfaceImperfections003_1K_var1.jpg",
    "texture/reflect/SurfaceImperfections003_1K_Normal.jpg",
  ]);
  return (
    // <Reflector
    //   blur={[400, 100]}
    //   resolution={1024}
    //   args={[10, 10]}
    //   mirror={1}
    //   mixBlur={3}
    //   mixStrength={1.5}
    //   rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    // >
    //   {(Material, props) => (
    //     <Material
    //       color="#a0a0a0"
    //       metalness={0.4}
    //       roughnessMap={floor}
    //       normalMap={normal}
    //       normalScale={new Vector2(2, 2)}
    //       {...props}
    //     />
    //   )}
    // </Reflector>
    <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        metalness={0.4}
        normalScale={new Vector2(0.15, 0.15)}
        roughnessMap={floor}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={1}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        // debug={0}
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
};

const Intro = ({
  start,
  set,
}: {
  start: boolean;
  set: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [vec] = useState(() => new Vector3());
  useEffect(() => {
    setTimeout(() => set(true), 500);
  }, []);
  return useFrame((state) => {
    if (start) {
      state.camera.position.lerp(
        vec.set(state.mouse.x * 5, 3 + state.mouse.y * 2, 14),
        0.05
      );
      state.camera.lookAt(0, 0, 0);
    }
  });
};

const Reflect = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const store = { clicked, setClicked, ready, setReady };
  return (
    <>
      <Box as="section" overflow="hidden" width="100%" height="100vh">
        <Canvas
          //   concurrent
          gl={{ alpha: false }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 3, 10], fov: 15 }}
        >
          <color attach="background" args={["black"]} />
          <fog attach="fog" args={["black", 15, 20]} />
          <Suspense fallback={null}>
            <group position={[0, -1, 0]}>
              <Carla
                rotation={new Euler(0, Math.PI - 0.4, 0)}
                position={new Vector3(-1.2, 0, 0.6)}
                scale={new Vector3(0.26, 0.26, 0.26)}
              />
              <VideoText {...store} position={[0, 1.3, -2]} />
              <Ground />
            </group>
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 10, 0]} intensity={0.3} />
            <directionalLight position={[-50, 0, -40]} intensity={0.7} />
            <Intro start={ready && clicked} set={setReady} />
          </Suspense>
        </Canvas>
        <Overlay {...store} />
      </Box>
    </>
  );
};

export default Reflect;
