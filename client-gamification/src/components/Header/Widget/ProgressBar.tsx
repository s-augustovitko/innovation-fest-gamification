import styles from "./ProgressBar.module.css";
import {motion} from "framer-motion";

interface ProgressBarProps {
    value: number
    total: number
}

const ProgressBar = ({value, total}: ProgressBarProps) => {
    return (
        <div className={styles.progressBar}>
            <motion.div
                className={styles.progress}
                animate={{width: `${value / total * 100}%`}}
            />
        </div>
    )
}

export default ProgressBar
