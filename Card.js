// Card.js
export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".cards__item-img");
    this._cardTitle = this._element.querySelector(".cards__item-title");
    this._deleteButton = this._element.querySelector(".cards__item-delete");
    this._likeButton = this._element.querySelector(".cards__item-button");
    this._setEventListeners();
    this._renderCard();
  }

  // Obtener la plantilla del HTML
  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".cards__item").cloneNode(true);
  }

  // Renderizar la tarjeta con los datos
  _renderCard() {
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
  }

  // Establecer los detectores de eventos
  _setEventListeners() {
    this._cardImage.addEventListener("click", this._openBigImage.bind(this));
    this._deleteButton.addEventListener("click", this._deleteCard.bind(this));
    this._likeButton.addEventListener("click", this._toggleLike.bind(this));
  }

  // Método para abrir la imagen en grande
  _openBigImage() {
    const bigImage = document.querySelector(".bigimage");
    const bigImageElement = bigImage.querySelector(".bigimage__img");
    const bigImageTitle = bigImage.querySelector(".bigimage__title");
    bigImageTitle.textContent = this._name;
    bigImageElement.src = this._link;
    bigImage.classList.add("bigimage__opened");
  }

  // Eliminar la tarjeta
  _deleteCard() {
    this._element.remove();
  }

  // Alternar el estado del "like"
  _toggleLike() {
    this._likeButton.classList.toggle("cards__item-button_active");
  }

  // Método público que devuelve el elemento card completamente funcional
  getCardElement() {
    return this._element;
  }
}