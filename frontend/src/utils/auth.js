class Auth {
    constructor({URL}) {
        this._url = URL;
    }

    //Проверка ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    //Регистрация
    register(data) {
        return fetch(`${this._url}/signup`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(this._checkResponse)
    }

    //Авторизация
    authorize(data) {
        return fetch(`${this._url}/signin`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
            .then(this._checkResponse)
    }

    //Проверка валидности токена
    checkToken() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        }).then(this._checkResponse);
    };
}
    export const auth = new Auth({
        URL: "https://api.maru-aruko.nomoredomains.icu",
    });