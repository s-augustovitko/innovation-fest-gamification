import styles from "./MetaBox.module.css";
import Tilt from "react-parallax-tilt";
import {classes} from "../../utils.ts";
import {PropsWithChildren} from "react";

interface MetaBoxProps extends PropsWithChildren {
    wide?: boolean
}

const MetaBox = ({wide = false, children}: MetaBoxProps) => {
    const containerClasses = classes({
        [styles.container]: true,
        [styles.containerWide]: !!wide
    });

    return (
        <Tilt
            className={styles.wrapper}
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
        >
            <div className={containerClasses}>
                {children}
            </div>
        </Tilt>
    )
}

export default MetaBox
