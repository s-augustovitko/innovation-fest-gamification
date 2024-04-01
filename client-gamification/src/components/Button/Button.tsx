import {PropsWithChildren} from "react";
import styles from "./Button.module.css";

const Button = ({children, ...props}: PropsWithChildren) => {
    return <button {...props} className={styles.container}>{children}</button>;
}

export default Button
