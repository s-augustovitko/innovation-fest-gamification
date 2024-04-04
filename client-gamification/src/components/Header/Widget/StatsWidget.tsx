import styles from "./StatsWidget.module.css";
import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import {Environment, PresentationControls} from "@react-three/drei";
import Badge3D from "../../Icon/Badge3D.tsx";
import ProgressBar from "./ProgressBar.tsx";
import useMockProgress from "./useMockProgress.ts";

const StatsWidget = () => {
    // read title and progress from api
    const level = 24
    const title = 'Grand Master'
    // progress is a number between 0 and 1
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
                <div className={styles.metaLeftContainer}>
                    <span className={styles.levelLabel}>Level</span>
                    <span className={styles.titleLabel}>{title}</span>
                </div>
                <div className={styles.progressContainer}>
                    <ProgressBar value={progress}>
                        <span className={styles.level}>{level}</span>
                    </ProgressBar>
                </div>
            </div>
        </div>
    )
}

export default StatsWidget
