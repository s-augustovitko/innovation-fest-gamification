import styles from "./Popover.module.css";
import {PropsWithChildren} from "react";
import {motion} from "framer-motion";

const Popover = ({children}: PropsWithChildren) => {
    return (
        <motion.div
            className={styles.popover}
            initial={{opacity: 0, y: 40, scale: 0, x: '-50%'}}
            animate={{opacity: 1, y: 0, scale: 1}}
        >{children}</motion.div>
    )
}

export default Popover
