class Api {
    constructor({url}) {
        this._url = url;
    }

    //Проверка ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

//Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

//Загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

    //Редактирование профиля
    setProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data["name"],
                about: data["about"]
            })
        })
            .then(this._checkResponse)
    }

    // Добавление новой карточки
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data["name"],
                link: data["link"]
            })
        })
            .then(this._checkResponse)
    }

//Удаление карточки
    removeCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: "DELETE",
            credentials: 'include',
        })
            .then(this._checkResponse)
    }

//Обновление аватара пользователя
    changeAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._checkResponse)
    }

    //Получаем обновлённые данные карточки
    changeLikeCardStatus(card, likeCardStatus) {
        return fetch(`${this._url}/cards/${card['_id']}/likes`, {
            method: (likeCardStatus ? "PUT": "DELETE"),
            credentials: 'include',
        }).then(this._checkResponse);
    }
}


export const api = new Api({
    url: 'https://api.maru-aruko.nomoredomains.icu',
});


