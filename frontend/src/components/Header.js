import React from "react";
import Logo from "../images/logo.svg";

function Header({loggedIn, userEmail, handleLogOut, children}) {
    return (
        <header className="header">
            <img className="header__logo" src={Logo} alt="Логотип «Место»"></img>
            {loggedIn && <div className="header__login">
                <p className="header__login-email">{userEmail}</p>
                <a onClick={handleLogOut} className="button header__logout-link">Выйти</a>
            </div>}
            {children}
        </header>
    )
}

export default Header;