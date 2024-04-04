import {useContext} from "react";
import {NotificationContext} from "./NotificationContext.tsx";
import styles from "./Notification.module.css"
import {classes} from "../utils.ts";


export const Notification = () => {
  const {notification} = useContext(NotificationContext)

  const iconClasses = classes({
    [styles.icon]: true,
    [styles.iconActive]: !!notification
  });

  const contentClasses = classes({
    [styles.content]: true,
    [styles.contentActive]: !!notification
  });

  return (
    <div className={styles.container}>

      <div className={iconClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="notifications" fill="#aaa">
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z"></path>
        </svg>
      </div>

      <div className={contentClasses}>
        {notification?.content}
        <svg height="1.5rem" width="1.5rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 464 464">
          <g>
            <polygon style={{fill: "#82C8DC"}} points="0,156 232,428 128.889,156"/>
            <polygon style={{fill: "#B4E6F0"}} points="335.111,156 232,428 464,156"/>
            <polygon style={{fill: "#D9FFFF"}} points="232,156 335.111,156 232,36 128.889,156"/>
            <polygon style={{fill: "#A0DCE6"}} points="232,156 128.889,156 232,428 335.111,156"/>
            <polygon style={{fill: "#A0DCE6"}} points="104,36 0,156 128.889,156"/>
            <polygon style={{fill: "#EBFFFF"}} points="464,156 360,36 335.111,156"/>
            <polygon style={{fill: "#B4E6F0"}} points="360,36 232,36 335.111,156"/>
            <polygon style={{fill: "#B4E6F0"}} points="232,36 104,36 128.889,156"/>
          </g>
        </svg>
      </div>
    </div>
  );
};

