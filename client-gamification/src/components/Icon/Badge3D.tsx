import * as THREE from 'three'
import {Float, useGLTF} from '@react-three/drei'
import {GLTF} from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Object_2: THREE.Mesh
        Object_3: THREE.Mesh
        Object_4: THREE.Mesh
    }
    materials: {
        material_0: THREE.MeshBasicMaterial
        lambert3SG: THREE.MeshBasicMaterial
        lambert5SG: THREE.MeshBasicMaterial
    }
}

const Badge3D = (props: JSX.IntrinsicElements['group']) => {
    const {scene} = useGLTF('/sandwich/scene.gltf') as GLTFResult

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
