import logo from '/logo.svg';
import styles from './Header.module.css';
import Button from "../Button/Button.tsx";

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
            <a href="#">Live TV</a>
            <a href="#">On Demand</a>
            <a href="#">Search</a>
        </div>
    )
}

const UserMenu = () => {
    return (
        <div className={styles.userMenu}>
            <span>avatar</span>
        </div>
    )
}

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <Hamburger/>
                <img src={logo} alt="logo"/>
            </div>
            <MainMenu/>
            <UserMenu/>
        </header>
    )
}

export default Header
