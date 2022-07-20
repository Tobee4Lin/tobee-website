import React, { Suspense } from "react";
import { Vector2 } from "three";
import { Canvas } from "@react-three/fiber";
import { Box, useColorModeValue } from "@chakra-ui/react";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Loader,
} from "@react-three/drei";
import { BlendFunction } from "postprocessing";

import Car from "./components/Car";
import Boxes from "./components/Boxes";
import Ground from "./components/Ground";
import FloatingGrid from "./components/FloatingGrid";
import Rings from "./components/Rings";

const ShiningRingCar = () => {
  return (
    <Box as="section" overflow="hidden" width="100%" height="100vh">
      <Suspense fallback={<Loader />}>
        <Canvas shadows>
          <OrbitControls
            target={[0, 0.35, 0]}
            maxPolarAngle={1.45}
          ></OrbitControls>
          <PerspectiveCamera
            makeDefault
            fov={50}
            position={[3, 2, 5]}
          ></PerspectiveCamera>
          <CubeCamera resolution={256} frames={Infinity}>
            {(texture) => (
              <>
                <Environment map={texture} />
                <Car />
              </>
            )}
          </CubeCamera>
          <color
            args={useColorModeValue([0, 0, 0], [255, 255, 255])}
            attach="backgroundColor"
          ></color>
          <spotLight
            color={[1, 0.25, 0.7]}
            intensity={1.5}
            angle={0.6}
            penumbra={0.5}
            position={[5, 5, 0]}
            castShadow
            shadow-bias={-0.0001}
          />
          <spotLight
            color={[0.14, 0.5, 1]}
            intensity={2}
            angle={0.6}
            penumbra={0.5}
            position={[-5, 5, 0]}
            castShadow
            shadow-bias={-0.0001}
          />

          <Ground />
          <FloatingGrid />
          <Boxes />
          <Rings />

          <EffectComposer>
            <Bloom
              blendFunction={BlendFunction.ADD}
              intensity={1.3} // The bloom intensity.
              width={300} // render width
              height={300} // render height
              kernelSize={5} // blur kernel size
              luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new Vector2(0.0005, 0.0012)}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </Box>
  );
};

export default ShiningRingCar;
