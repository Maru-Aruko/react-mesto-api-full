import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";

function Login({handleLogin}) {
    const [loginInfo, setLoginInfo] = React.useState(
        {
            email: "",
            password: ""
        });

    function handleChange(e) {
        const {name, value} = e.target;
        setLoginInfo({...loginInfo, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault()
        handleLogin(loginInfo);
    }

    return (
        <>
            <Header><Link to="/sign-up" className="button header__login-link">Регистрация</Link></Header>

            <div className="auth">
                <h2 className="auth__title">Вход</h2>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input className="auth__input popup__input" onChange={handleChange} name="email" type="email"
                           placeholder="Email" value={loginInfo.email} minLength="2" maxLength="200" required
                    />
                    <input className="auth__input popup__input" onChange={handleChange} name="password" type="password"
                           placeholder="Пароль" value={loginInfo.password} minLength="2" maxLength="200" required
                    />
                    <button className="auth__register-button popup__save-button button" type="submit">Войти</button>
                </form>
            </div>
        </>
    )
}

export default Login;
