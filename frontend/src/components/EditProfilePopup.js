import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const [name, setName] = React.useState("");

    function handleNameInputChange(e) {
        setName(e.target.value);
    }

    const [description, setDescription] = React.useState("");

    function handleDescriptionInputChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="save" text="Сохранить"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
                       loadingText="Сохранение...">
            <label className="popup__field">
                <input className="popup__input" id="nameInput" name="name" placeholder="Ваше имя"
                       value={name || ''} onChange={handleNameInputChange}
                       minLength="2" maxLength="40" required></input>
                <span className="popup__input-error nameInputError" id="nameInputError"></span>
            </label>
            <label className="popup__field">
                <input className="popup__input" id="jobInput" name="about" placeholder="О себе"
                       value={description || ''} onChange={handleDescriptionInputChange}
                       minLength="2" maxLength="200" required></input>
                <span className="popup__input-error jobInputError" id="jobInputError"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;