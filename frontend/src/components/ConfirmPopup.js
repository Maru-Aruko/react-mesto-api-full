import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({card, isOpen, onClose, onConfirm, isLoading}) {

    function handleSubmit(e) {
        e.preventDefault();
        onConfirm(card);
    }

    return (
        <PopupWithForm
            title="Вы уверены?"
            name="confirm"
            text="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            id="popupConfirm"
            isLoading={isLoading}
            loadingText="Удаление...">
        </PopupWithForm>
    )
}

export default ConfirmPopup;


