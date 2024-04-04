import {useContext} from "react";
import {NotificationContext} from "./NotificationContext.tsx";
import styles from "./Notification.module.css"
import {classes} from "../utils.ts";


export const Notification = () => {
  const {notification} = useContext(NotificationContext)

  const contentClasses = classes({
    [styles.content]: true,
    [styles.contentActive]: !!notification
  });

  return (
    <div className={styles.container}>
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

