import {createContext, PropsWithChildren, useState} from "react";

type NotificationType = { duration: number, content: string };

type NotificationContextType = {
  showNotification: (notification: NotificationType) => void
  notification?: NotificationType,
}

export const NotificationContext = createContext({} as NotificationContextType);

export const NotificationProvider = ({children}: PropsWithChildren) => {
  const [notification, setNotification] = useState<NotificationType | undefined>(undefined);

  const showNotification: NotificationContextType["showNotification"] = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(undefined);
    }, notification.duration)
  };

  return (
    <NotificationContext.Provider value={{notification, showNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};