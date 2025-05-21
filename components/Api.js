export class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    }
  
    _request(url, options) {
      return fetch(url, {
        ...options,
        headers: this._headers
      }).then(this._checkResponse);
    }
  
    getUserInfo() {
      return this._request(`${this._baseUrl}/users/me`, {
        method: 'GET'
      });
    }
  
    getInitialCards() {
      return this._request(`${this._baseUrl}/cards`, {
        method: 'GET'
      });
    }
  
    editUser(data) {
      return this._request(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      });
    }
  
    createCard(data) {
      return this._request(`${this._baseUrl}/cards`, {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      });
    }
  
    deleteCard(cardId) {
      return this._request(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE'
      });
    }

    likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers
      }).then(this._checkResponse);
    }
    
    dislikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers
      }).then(this._checkResponse);
    }
  
    toggleLike(cardId, isLiked) {
      return isLiked ? this.dislikeCard(cardId) : this.likeCard(cardId);
    }
  
    updateAvatar(data) {
      return this._request(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        body: JSON.stringify({
          avatar: data.avatar
        })
      });
    }
  }