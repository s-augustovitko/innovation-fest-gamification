import styles from "./StatsWidget.module.css";
import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import {Environment, PresentationControls} from "@react-three/drei";
import Badge3D from "../../Icon/Badge3D.tsx";
import ProgressBar from "./ProgressBar.tsx";
import useMockProgress from "./useMockProgress.ts";

const StatsWidget = () => {
    // read title and progress from api
    const title = 'Lvl. Foobar'
    const progress = useMockProgress()

    return (
        <div className={styles.widget}>
            <Canvas style={{width: '80px', height: '64px'}}>
                <Environment preset={'lobby'}/>
                <Suspense fallback={null}>
                    <PresentationControls
                        snap global zoom={0.8} rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}>
                        <Badge3D model={'tmnt'}/>
                    </PresentationControls>
                </Suspense>
            </Canvas>
            <div className={styles.metadata}>
                <div>{title}</div>
                <ProgressBar value={progress} total={10}/>
            </div>
        </div>
    )
}

export default StatsWidget
