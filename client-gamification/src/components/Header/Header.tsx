import logo from '/logo.svg';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src={logo} alt="logo"/>
            </div>
        </header>
    )
}

export default Header
