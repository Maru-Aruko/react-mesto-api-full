import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import {Switch, Route, Redirect, useHistory} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import {auth} from "../utils/auth";


function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);


    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    const [selectedCard, setSelectedCard] = React.useState({});

    const [isLoading, setIsLoading] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState(null);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const history = useHistory();

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleConfirmClick(card) {
        setIsConfirmPopupOpen(true);
        setSelectedCard(card)
    }

    function handleCardClick(img) {
        setImagePopupOpen(true);
        setSelectedCard(img);
    }

    function handleOverlayClose(evt) {
        const evtTarget = evt.target;
        if (evtTarget.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setIsConfirmPopupOpen(false);
        setImagePopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
        setSelectedCard({});
    }

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([me, cards]) => {
                setCurrentUser(me);
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [loggedIn]);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card["likes"].some((i) => i === currentUser["_id"]);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card, !isLiked)
            .then((newCardData) => {
                setCards(
                    cards.map((cardFromState) =>
                        cardFromState['_id'] === card['_id'] ? newCardData : cardFromState
                    )
                );
            })
            .catch((err) => {
                console.error(err);
            })
    }

    function handleCardDelete(card) {
        setIsLoading(true)
        api.removeCard(card["_id"])
            .then(() => {
                setCards((items) => items.filter((c) => c["_id"] !== card["_id"] && c));
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleUpdateUser(data) {
        setIsLoading(true)
        api.setProfile(data)
            .then((dataUser) => {
                setCurrentUser({
                    ...currentUser,
                    name: dataUser.name,
                    about: dataUser.about,
                });
                closeAllPopups();
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }

    const handleUpdateAvatar = (newAvatar) => {
        setIsLoading(true)
        api.changeAvatar(newAvatar)
            .then((data) => {
                setCurrentUser({...currentUser, avatar: data.avatar});
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });

    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true)
        api.addNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleRegister(data) {
        auth.register(data)
            .then(() => {
                setIsSuccess(true);
                setIsInfoTooltipPopupOpen(true);
                history.push("/sign-in")
            })
            .catch((err) => {
                console.log(err);
                setIsSuccess(false);
                setIsInfoTooltipPopupOpen(true);
            })
    }

    React.useEffect(() => {
        if (loggedIn) {
            history.push('/');
        }
    }, [loggedIn, history]);

    React.useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            checkToken();
        }
    }, [checkToken]);

    function handleLogin(data) {
        auth.authorize(data)
            .then((newData) => {
                localStorage.setItem('jwt', newData["token"]);
                checkToken()
            })
            .catch((err) => {
                console.log(err);
                setIsSuccess(false);
                setIsInfoTooltipPopupOpen(true);
            })
    }


    function checkToken() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken()
                .then((res) => {
                    setUserEmail(res.email);
                    setLoggedIn(true);
                    history.push("/");
                })
                .catch(err => console.log(err));
        }
    }

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        history.push("/sign-in");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <Route path="/sign-up">
                        <Register handleRegister={handleRegister}/>
                    </Route>
                    <Route path="/sign-in">
                        <Login handleLogin={handleLogin}/>
                    </Route>
                    <Route exact path="/">
                        <ProtectedRoute loggedIn={loggedIn} userEmail={userEmail} handleLogOut={handleLogout}
                                        component={Header}/>
                        <ProtectedRoute
                            component={Main}
                            loggedIn={loggedIn}
                            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards}
                            onCardLike={handleCardLike} onCardDelete={handleConfirmClick}
                        />
                        <ProtectedRoute loggedIn={loggedIn} component={Footer}/>
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to="/sign-in"/> : <Redirect to="/"/>}
                    </Route>
                </Switch>

                <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}
                            handleOverlayClose={handleOverlayClose}></ImagePopup>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}
                               isLoading={isLoading}/>

                <ConfirmPopup card={selectedCard} isOpen={isConfirmPopupOpen} onClose={closeAllPopups}
                              onConfirm={handleCardDelete} isLoading={isLoading}/>

            </div>
            <InfoTooltip
                isOpen={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
                isSuccess={isSuccess}
            />
        </CurrentUserContext.Provider>
    );
}

export default App;
