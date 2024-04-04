import styles from './ProgressBar.module.css'
import {PropsWithChildren} from "react";

interface ProgressBarProps extends PropsWithChildren {
    value: number
}

const ProgressBar = ({value, children}: ProgressBarProps) => {
    let progress = 100 - Math.floor(value * 100)
    if (progress < 0) {
        progress = 0
    }

    return (
        <div className={styles.wrapper}>
            <svg className={styles.svg}
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="-1 -1 34 34">

                <circle cx="16" cy="16" r="15.9155"
                        className={styles.svgBackground}/>

                <circle cx="16" cy="16" r="15.9155"
                        className={styles.svgProgress}
                        strokeDashoffset={progress}
                />
            </svg>
            {children}
        </div>
    )
}

export default ProgressBar
