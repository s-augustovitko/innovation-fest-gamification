import Button from "../../Button/Button.tsx";
import {ReactElement} from "react";
import styles from './NavWithIcon.module.css';

interface NavWithIconProps {
    icon: ReactElement
    active?: boolean
    label?: string
}

const NavWithIcon = ({icon, label, active = false}: NavWithIconProps) => {
    return (
        <Button>
            <div className={`${styles.wrapper} ${active ? styles.active : ''}`}>
                {icon}
                {label ?? (<span>{label}</span>)}
            </div>
        </Button>
    )
}

export default NavWithIcon
