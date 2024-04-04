import logo from '/logo.svg';
import styles from './Header.module.css';
import Button from "../Button/Button.tsx";
import NavWithIcon from "./NavWithIcon/NavWithIcon.tsx";
import UserMenu from "./UserMenu/UserMenu.tsx";
import {Notification} from "../Notification/Notification.tsx";
import {useContext} from "react";
import {NotificationContext} from "../Notification/NotificationContext.tsx";

const Hamburger = () => {
  return (
    <Button style={{width: '39px', height: '39px'}}>
      <div className={styles.hamburger}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg"
             aria-hidden="true" focusable="false">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M4 8C3.45 8 3 7.55 3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7C21 7.55 20.55 8 20 8H4ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18Z"></path>
        </svg>
      </div>
    </Button>
  )
}

const MainMenu = () => {
  return (
    <div className={styles.mainMenu}>
      <NavWithIcon icon={(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             aria-hidden="true" focusable="false">
          <path
            d="M3.6 4.80005C2.71562 4.80005 2 5.51567 2 6.40005V16C2 16.8844 2.71562 17.6 3.6 17.6H19.6C20.4844 17.6 21.2 16.8844 21.2 16V6.40005C21.2 5.51567 20.4844 4.80005 19.6 4.80005H3.6ZM7.6 19.2C7.31172 19.1961 7.04297 19.3477 6.89766 19.5969C6.75234 19.8461 6.75234 20.154 6.89766 20.4032C7.04297 20.6524 7.31172 20.804 7.6 20.8H15.6C15.8883 20.804 16.157 20.6524 16.3023 20.4032C16.4477 20.154 16.4477 19.8461 16.3023 19.5969C16.157 19.3477 15.8883 19.1961 15.6 19.2H7.6Z"></path>
        </svg>)} active={true} label="Live TV"/>
      <NavWithIcon icon={(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
             aria-hidden="true" focusable="false">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M2 12.06C2 6.50688 6.50688 2 12.06 2C17.6131 2 22.12 6.50688 22.12 12.06C22.12 17.6131 17.6131 22.12 12.06 22.12C6.50688 22.12 2 17.6131 2 12.06ZM9.81674 8.88133V15.3805C9.81674 16.0272 10.4939 16.4025 10.9924 16.0272L15.2858 12.7776C15.7025 12.4663 15.7025 11.7956 15.2858 11.4762L10.9924 8.22663C10.4939 7.85935 9.81674 8.23461 9.81674 8.88133Z"></path>
        </svg>)}
                   label="On Demand"/>
      <NavWithIcon icon={(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.5 14H14.71L14.43 13.73C15.63 12.33 16.25 10.42 15.91 8.39C15.44 5.61 13.12 3.39 10.32 3.05C6.09001 2.53 2.53002 6.09 3.05002 10.32C3.39002 13.12 5.61002 15.44 8.39002 15.91C10.42 16.25 12.33 15.63 13.73 14.43L14 14.71V15.105V15.5L18.25 19.75C18.66 20.16 19.33 20.16 19.74 19.75C20.15 19.34 20.15 18.67 19.74 18.26L15.5 14ZM9.50002 14C7.01002 14 5.00002 11.99 5.00002 9.5C5.00002 7.01 7.01002 5 9.50002 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.50002 14Z"></path>
        </svg>)}
                   label="Search"/>
    </div>
  )
}

const Header = () => {
  const {showNotification} = useContext(NotificationContext)

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <Hamburger/>
        <img src={logo} alt="logo"/>
      </div>
      <MainMenu/>
      <div className={styles.headerRight} onClick={() => showNotification({duration: 10000, content: "Leveled UP"})}>
        <Notification/>
        <UserMenu/>
      </div>
    </header>
  )
}

export default Header
