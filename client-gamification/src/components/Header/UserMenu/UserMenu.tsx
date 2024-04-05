import styles from "./UserMenu.module.css";
import StatsWidget from "../Widget/StatsWidget.tsx";
import {Notification} from "../../Notification/Notification.tsx";
import {useContext} from "react";
import {NotificationContext} from "../../Notification/NotificationContext.tsx";
import {classes} from "../../utils.ts";
import Avatar from "./Avatar.tsx";

const UserMenu = () => {
    const {showNotification, notification} = useContext(NotificationContext);

    const widgetClasses = classes({
        [styles.effects]: true,
        [styles.hide]: !!notification
    });

    const notificationClasses = classes({
        [styles.effects]: true,
        [styles.hide]: !notification
    });

    return (
        <div className={styles.container} onClick={() => showNotification({duration: 3000, content: "Leveled UP"})}>
            <div className={styles.widgets}>
                <div className={notificationClasses}>
                    <Notification/>
                </div>
                <div className={widgetClasses}>
                    <StatsWidget/>
                </div>
            </div>
            <div className={styles.avatar}>
                <Avatar/>
            </div>
        </div>
    );
};

export default UserMenu;
