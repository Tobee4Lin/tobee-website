import React from "react";
import { useThree } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";

const EffectIndex = React.forwardRef((props, ref: any) => {
  const {
    viewport: { width, height },
  } = useThree();
  return (
    <EffectComposer multisampling={0}>
      <DepthOfField
        ref={ref}
        bokehScale={4}
        focalLength={0.1}
        width={width}
        height={height}
      />
      <Vignette />
    </EffectComposer>
  );
});

export default EffectIndex;
