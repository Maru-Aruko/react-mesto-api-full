import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";

function Register({handleRegister}) {
    const [registerInfo, setRegisterInfo] = React.useState(
        {
            email: "",
            password: ""
        });

    function handleChange(e) {
        const {name, value} = e.target;
        setRegisterInfo({...registerInfo, [name]: value});
    }

    function handleSubmit(e) {
        e.preventDefault()
        handleRegister(registerInfo);
    }

    return (
        <>
            <Header><Link to="/sign-in" className="header__login-link button">Войти</Link></Header>

            <div className="auth">
                <h2 className="auth__title">Регистрация</h2>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input className="auth__input popup__input" onChange={handleChange} name="email" type="email"
                           placeholder="Email" value={registerInfo.email} minLength="2" maxLength="200" required
                    />
                    <input className="auth__input popup__input" onChange={handleChange} name="password" type="password"
                           placeholder="Пароль" value={registerInfo.password} minLength="2" maxLength="200" required
                    />
                    <button className="auth__register-button popup__save-button button" type="submit">Зарегистрироваться</button>
                </form>
                <div className="auth__sign-in">
                    <p className="auth__question">Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="auth__login-link button">Войти</Link>
                </div>
            </div>
        </>
    )
}

    export default Register;
