import styles from "./StatsWidget.module.css";
import {Canvas} from "@react-three/fiber";
import {Suspense, useEffect, useState} from "react";
import {PresentationControls} from "@react-three/drei";
import Badge3D from "../../Icon/Badge3D.tsx";
import ProgressBar from "./ProgressBar.tsx";

const TIME_INTERVAL = 2000

const StatsWidget = () => {
    const [progress, setProgress] = useState(0)
    let timer: number

    useEffect(() => {
        timer = setInterval(() => {
            setProgress(prev => prev < 10 ? prev + 1 : 0)
        }, TIME_INTERVAL)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className={styles.widget}>
            <Canvas style={{width: '80px', height: '64px'}}>
                <Suspense fallback={null}>
                    <ambientLight/>
                    <PresentationControls
                        snap global zoom={0.8} rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]}
                        azimuth={[-Math.PI / 4, Math.PI / 4]}>
                        <Badge3D/>
                    </PresentationControls>
                </Suspense>
            </Canvas>
            <div className={styles.metadata}>
                <div>Lvl. Sandwich</div>
                <ProgressBar value={progress} total={10}/>
            </div>
        </div>
    )
}

export default StatsWidget
