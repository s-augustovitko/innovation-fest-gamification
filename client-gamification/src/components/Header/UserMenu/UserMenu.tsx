import styles from "./UserMenu.module.css";
import StatsWidget from "../Widget/StatsWidget.tsx";
import { Notification } from "../../Notification/Notification.tsx";
import { useContext } from "react";
import { NotificationContext } from "../../Notification/NotificationContext.tsx";
import { classes } from "../../utils.ts";

const UserMenu = () => {
    const { showNotification, notification } = useContext(NotificationContext);

    const widgetClasses = classes({
        [styles.effects]: true,
        [styles.hide]: !!notification,
    })

    const notificationClasses = classes({
        [styles.effects]: true,
        [styles.hide]: !notification,
    })

    return (
        <div className={styles.container} onClick={() => showNotification({ duration: 3000, content: "Leveled UP" })}>
            <div className={styles.widgets}>
                <div className={notificationClasses}>
                    <Notification />
                </div>
                <div className={widgetClasses}>
                    <StatsWidget />
                </div>
            </div>
            <div className={styles.avatar}>
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                     className="profileIcon-0-2-182">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M12 1.16669C6.01996 1.16669 1.16663 6.02002 1.16663 12C1.16663 17.98 6.01996 22.8334 12 22.8334C17.98 22.8334 22.8333 17.98 22.8333 12C22.8333 6.02002 17.98 1.16669 12 1.16669ZM12 4.41669C13.7983 4.41669 15.25 5.86835 15.25 7.66669C15.25 9.46502 13.7983 10.9167 12 10.9167C10.2016 10.9167 8.74996 9.46502 8.74996 7.66669C8.74996 5.86835 10.2016 4.41669 12 4.41669ZM5.49996 16.3117C6.89746 18.4134 9.29162 19.8 12 19.8C14.7083 19.8 17.1025 18.4134 18.5 16.3117C18.4675 14.1559 14.1558 12.975 12 12.975C9.83329 12.975 5.53246 14.1559 5.49996 16.3117Z"></path>
                </svg>
            </div>
        </div>
    );
};

export default UserMenu;
