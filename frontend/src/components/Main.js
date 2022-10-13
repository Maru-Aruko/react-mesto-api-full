import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {

    const currentUserContext = React.useContext(CurrentUserContext);
    return (
        <main className="page__content">
            <section className="profile">
                <div className="profile__avatar">
                    {currentUserContext.avatar && (<img className="profile__avatar-img" src={currentUserContext.avatar}
                                                        alt="Аватар профиля"/>)}
                    <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name" id="name">{currentUserContext.name}</h1>
                    <button className="profile__edit-button button" onClick={onEditProfile} type="button"
                            id="editButton"></button>
                    <p className="profile__job" id="job">{currentUserContext.about}</p>
                </div>
                <button className="profile__add-button button" onClick={onAddPlace} id="addButton"
                        type="button"></button>
            </section>
            <section className="cards">
                {cards.map((card) => { return(<Card card={card}
                                                         key={card["_id"]}
                                                         onCardClick={onCardClick}
                                                         onCardLike={onCardLike}
                                                         onCardDelete={onCardDelete}></Card>)})}
            </section>
        </main>
    )
}

export default Main;