import React, {PropsWithChildren} from "react";
import styles from "./Button.module.css";

const Button = ({children, ...props}: PropsWithChildren & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button {...props} className={styles.container}>{children}</button>;
}

export default Button
