import { baseUrl } from './constants.js';

class Auth {
    constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(password, email) {
      return fetch(`${this._baseUrl}signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          password: password,
          email: email
        })
      })
      .then(this._checkResponse)
    };

    authorization(password, email) {
      return fetch(`${this._baseUrl}signin`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          password: password,
          email: email
        })
      })
      .then(this._checkResponse)
    };

    checkToken(jwt) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${jwt}`
        }
      })
      .then(this._checkResponse)
    };
}

const auth = new Auth(baseUrl);
export default auth;

