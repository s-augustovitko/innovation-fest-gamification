import styles from "./StatsWidget.module.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Environment, PresentationControls } from "@react-three/drei";
import Badge3D from "../../Icon/Badge3D.tsx";
import ProgressBar from "./ProgressBar.tsx";
import DetailWidget from "./DetailWidget.tsx";

const StatsWidget = (props: {level: number, progress: number, title: string}) => {
    const [hover, setHover] = useState(false)

    return (
        <div className={styles.widget}
             onPointerEnter={() => setHover(true)}
             onPointerLeave={() => setHover(false)}>
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
                    <span className={styles.titleLabel}>{props.title}</span>
                </div>
                <div className={styles.progressContainer}>
                    <ProgressBar value={props.progress}>
                        <span className={styles.level}>{props.level}</span>
                    </ProgressBar>
                </div>
            </div>

            {hover && (<DetailWidget/>)}
        </div>
    )
}

export default StatsWidget
