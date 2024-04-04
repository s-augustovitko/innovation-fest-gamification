import {Float, useGLTF} from '@react-three/drei'

const Badge3D = (props: JSX.IntrinsicElements['group']) => {
    const {scene} = useGLTF('/sandwich/scene.gltf')

    return (
        <group {...props} dispose={null}>
            <Float rotationIntensity={2} floatIntensity={6} speed={1.5}>
                <primitive object={scene}/>
            </Float>
        </group>
    )
}

useGLTF.preload('/scene.gltf')

export default Badge3D
