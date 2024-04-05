import { Center, Float, Resize, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";

export const MODEL_MAP = {
    "sandwich": "/models/sandwich/scene.gltf",
    "tmnt": "/models/tmnt/scene.gltf",
    "rocko": "/models/rocko/scene.gltf",
    "gary": "/models/gary/scene.gltf",
    "catdog": "/models/catdog/scene.gltf"
};

interface Badge3DProps {
    model: string;
}

// const margin = 0.5

const Badge3D = ({ model }: Badge3DProps) => {
    // @ts-ignore
    const modelPath = MODEL_MAP[model] as string;
    const { scene } = useGLTF(modelPath);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        setShouldRender(false);
        setTimeout(() => {
            setShouldRender(true);
        });
    }, [model]);

    return (
        <group dispose={null}>
            {shouldRender && (
                <Float rotationIntensity={5} floatIntensity={6} speed={1.5}>
                    <Center>
                        <Resize scale={5}>
                            <primitive object={scene} />
                        </Resize>
                    </Center>
                </Float>
            )}
        </group>
    );
};

Object.values(MODEL_MAP).forEach((path) => {
    useGLTF.preload(path);
});

export default Badge3D;
