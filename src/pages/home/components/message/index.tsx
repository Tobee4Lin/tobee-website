import React, { useLayoutEffect, useMemo, useRef } from "react"
import { OrbitControls, Html, Environment } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { useControls } from "leva"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import "@/types/customTextGeometry.type"

function Message({ message }: MyMessageProps) {
    const ref = useRef<THREE.Mesh>();
    const { color, text } = useControls({ color: "aqua", text: "tobee" });
    const font = useLoader(FontLoader, "/typefaces/optimer_bold.typeface.json");
    const config = useMemo(() => ({ font, size: 3, height: 0.5 }), [font]);
    useLayoutEffect(() => {
        ref.current?.geometry.center();
    }, [text]);
    return (
        <Canvas camera={{ position: [0, 1, 10], fov: 70 }} dpr={[1, 2]}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} color="yellow" />
            <mesh ref={ref}>
                {/* <Html className="text">{text}</Html> */}
                <customTextGeometry args={[text, config]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <Environment preset='apartment' background />
        </Canvas>
    )
}

export default Message;
