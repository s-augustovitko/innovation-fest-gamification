import styles from './Badge.module.css'
import {useState} from "react";
import Popover from "./Popover.tsx";

interface BadgeProps {
    name: string,
    description?: string,
}

const Badge = ({name, description}: BadgeProps) => {
    const [hover, setHover] = useState(false)

    return (
        <div>
            <div className={styles.container}
                 onPointerEnter={() => setHover(true)}
                 onPointerLeave={() => setHover(false)}
            >
                {name}
            </div>
            {(description && hover) && (<Popover><span>{description}</span></Popover>)}
        </div>
    )
}

export default Badge
