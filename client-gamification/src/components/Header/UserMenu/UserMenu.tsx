import styles from "./UserMenu.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import StatsWidget from "../Widget/StatsWidget.tsx";
import { useGetStatisticsQuery } from "../../../app/features/api.ts";
import { NotificationContext } from "../../Notification/NotificationContext.tsx";
import { classes } from "../../utils.ts";
import { Notification } from "../../Notification/Notification.tsx";
import Avatar from "./Avatar.tsx";
import DetailWidget from "../Widget/DetailWidget.tsx";

const UserMenu = () => {
    const [hover, setHover] = useState(false)
    const { data: statistics } = useGetStatisticsQuery();
    const { showNotification, notification } = useContext(NotificationContext);
    const notificationsReadyRef = useRef(false);

    const widgetClasses = classes({
        [styles.effects]: true,
        [styles.hide]: !!notification
    });

    const notificationClasses = classes({
        [styles.effects]: true,
        [styles.hide]: !notification
    });

    const previousLevel = statistics?.xp_previous_level ?? 0;
    const currentXp = statistics?.xp ?? 0;
    const nextLevel = statistics?.xp_next_level ?? 0;

    const total = nextLevel - previousLevel;
    const current = currentXp - previousLevel;
    const progress = current / total;

    useEffect(() => {
        if (notificationsReadyRef.current) {
            showNotification({ duration: 4000, content: "Leveled UP" });
        }

        if (statistics?.level) {
            notificationsReadyRef.current = true;
        }
    }, [statistics?.level]);

    return (
        <div className={styles.container}>
            <div className={styles.widgets} onPointerEnter={() => setHover(true)}
                 onPointerLeave={() => setHover(false)}>

                <div className={notificationClasses}>
                    <Notification />
                </div>
                <div className={widgetClasses}>
                    <StatsWidget level={statistics?.level ?? 0} progress={progress} title={statistics?.level_title ?? "Loading..."} />
                </div>
                {hover && <DetailWidget statistics={statistics} />}
            </div>
            <div className={styles.avatar}>
                <Avatar />
            </div>
        </div>
    );
};

export default UserMenu;
