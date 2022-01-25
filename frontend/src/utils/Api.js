import { baseUrl } from './constants.js'

class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

  updateUserInformation(nameUser, aboutUser, jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameUser,
        about: aboutUser
      })
    })
      .then(this._checkResponse)
  }

  updateUserAvatar(link, jwt) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then(this._checkResponse)
  }

  getUserInformation(jwt) {
    return fetch(`${this._baseUrl}users/me`, {
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      }
    })
      .then(this._checkResponse)
  }

  getCards(jwt) {
    return fetch(`${this._baseUrl}cards`, {
      headers: {
        "Authorization" : `Bearer ${jwt}`,
      }
    })
      .then(this._checkResponse)
  }

  addCard(nameCard, linkCard, jwt) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
      })
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked, jwt) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        "Authorization" : `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId, jwt) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      "Authorization" : `Bearer ${jwt}`,
      }
    })
      .then(this._checkResponse)
  }

}

const api = new Api(baseUrl);
export default api;