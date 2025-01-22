// Card.js
export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".cards__item-img");
    this._cardTitle = this._element.querySelector(".cards__item-title");
    this._deleteButton = this._element.querySelector(".cards__item-delete");
    this._likeButton = this._element.querySelector(".cards__item-button");
    this._setEventListeners();
    this._renderCard();
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".cards__item").cloneNode(true);
  }

  _renderCard() {
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
  }

 _setEventListeners() {
    // Cuando se haga clic en la imagen de la tarjeta, se llama a handleCardClick
    this._cardImage.addEventListener("click", () => this._handleCardClick(this._name, this._link));
    this._deleteButton.addEventListener("click", this._deleteCard.bind(this));
    this._likeButton.addEventListener("click", this._toggleLike.bind(this));
  }

  _deleteCard() {
    this._element.remove();
  }

  _toggleLike() {
    this._likeButton.classList.toggle("cards__item-button_active");
  }

  getCardElement() {
    return this._element;
  }
}

  // Datos iniciales de las tarjetas
  export const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
  ];