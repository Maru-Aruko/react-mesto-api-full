import React from "react";
import successImg from "../images/Success.svg";
import notSuccessImg from "../images/notSuccess.svg"

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container popup__container-auth">
                <button className="button popup__close-button" type="button" onClick={props.onClose}></button>
                <img className="popup__auth-img"
                     alt={props.isSuccess ? "Вы успешно зарегистрировались"
                         : "Что-то пошло не так! Попробуйте еще раз."}
                     src={props.isSuccess ? successImg : notSuccessImg}>
                </img>
                <h2 className="popup__auth-title">
                    {props.isSuccess ? "Вы успешно зарегистрировались"
                        : "Что-то пошло не так! Попробуйте еще раз."}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;