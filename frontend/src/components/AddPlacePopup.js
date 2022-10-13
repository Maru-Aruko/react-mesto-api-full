import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    return (
        <PopupWithForm title="Новое место"
                       name="create"
                       text="Создать"
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       isLoading={isLoading}
                       loadingText="Создание...">
            <label className="popup__field">
                <input className="popup__input"
                       id="placeNameInput"
                       name="place-name"
                       placeholder="Название"
                       value={name || ""}
                       onChange={handleNameChange}
                       required></input>
                <span className="popup__input-error placeNameInputError" id="placeInputError"></span>
            </label>
            <label className="popup__field">
                <input className="popup__input"
                       id="placeLinkInput"
                       name="place-link"
                       type="url"
                       placeholder="Ссылка на картинку"
                       value={link || ""}
                       onChange={handleLinkChange}
                       required></input>
                <span className="popup__input-error placeLinkInputError" id="linkInputError"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;