import styles from './Layout.module.css';
import {PropsWithChildren} from "react";

const Layout = (props: PropsWithChildren) => {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}

export default Layout
