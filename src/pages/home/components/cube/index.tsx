import React, { useRef, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { softShadows, MeshWobbleMaterial, OrbitControls } from "@react-three/drei"

softShadows();  // 阴影模糊化

function Cube() {
    const meshRef = useRef();
    const [expand, setExpand] = useState(true);
    const props = useSpring({
        scale: expand ? 1.5 : 1,
        // config: config.wobbly
    });
    return (
        <>
            <Canvas
                linear={true}  // 适用于所有颜色和纹理的自动sRGB编码
                shadows={true}  // gl.shadowMap
                camera={{ position: [0, 1, 4], fov: 70 }}
            >
                {/*pointLight 光源*/}
                <pointLight position={[10, 10, 10]} />
                {/*环境光源 调节点光源*/}
                <ambientLight intensity={0.1} />
                {/*平行光， 设置阴影*/}
                <directionalLight
                    castShadow
                    position={[0, 10, 0]}
                    intensity={1.5}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                {/*mesh 网格模型 */}
                <animated.mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -3, 0]}
                    receiveShadow // 接收阴影
                >
                    {/*添加平面几何，用于投射阴影*/}
                    <planeBufferGeometry attach='geometry' args={[100, 100]} />
                    <shadowMaterial attach='material' opacity={0.3} />
                </animated.mesh>
                <animated.mesh
                    ref={meshRef}
                    onClick={() => setExpand(!expand)}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={props.scale}
                    castShadow  // 产生阴影
                >
                    {/*xxxBufferGeometry 几何体对象*/}
                    <boxBufferGeometry attach="geometry" />
                    {/*Material 材质设定*/}
                    <MeshWobbleMaterial
                        color={expand ? 'hotpink' : 'orange'}
                        speed={13}
                        factor={0.3}
                    />
                </animated.mesh>
                {/*用于旋转观察*/}
                <OrbitControls />
            </Canvas>
        </>
    );
}

export default Cube;