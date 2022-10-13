import React from "react";

function ImagePopup({card, isOpen, onClose, handleOverlayClose}) {
    return (
        <div className={isOpen ? "popup popup_img-bg popup_opened" : "popup popup_img-bg"} onClick={handleOverlayClose}>
            <div className="popup__container popup__container_img" id="popupCardImg">
                <button className="popup__close-button button" id="closeButtonImg" type="button"
                        onClick={onClose}></button>
                <img className="popup__img" src={card.link} alt={card.name}/>
                <p className="popup__text">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;