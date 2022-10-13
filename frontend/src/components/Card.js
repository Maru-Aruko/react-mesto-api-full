import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext)

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    const isOwn = card.owner._id === currentUser._id || card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button button' : 'card__delete-button_hide button'}`
    );

    const isLiked = card.likes.some((i) => i === currentUser["_id"]);
    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? `card__like-button_active button` : `card__like-button button`}`
    );

    return (
        <figure className="card">
            <img className="card__img" id="cardImg" src={card.link} alt={card.name} onClick={handleClick}/>
            <button className={cardDeleteButtonClassName} id="deleteButton"
                    type="button" onClick={handleDeleteClick}></button>
            <figcaption className="card__text">
                <h3 className="card__name" id="cardName">{card.name}</h3>
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
            </figcaption>
            <p className="card__like-counter">{card.likes.length}</p>
        </figure>
    )
}

export default Card;
