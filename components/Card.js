export class Card {
  constructor(
    name,
    link,
    templateSelector,
    handleCardClick,
    cardId,
    isLiked = false,
    userId,
    ownerId,
    handleDeleteClick,
    handleLikeClick
  ) {
    if (!templateSelector || !handleCardClick) {
      throw new Error('Parámetros requeridos faltantes');
    }

    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardId = cardId;
    this._isLiked = Boolean(isLiked);
    this._userId = userId;
    this._ownerId = ownerId;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".cards__item-img");
    this._cardTitle = this._element.querySelector(".cards__item-title");
    this._deleteButton = this._element.querySelector(".cards__item-delete");
    this._likeButton = this._element.querySelector(".cards__item-button");
    this._likeCount = this._element.querySelector(".cards__like-count");

    if (!this._cardImage || !this._cardTitle || !this._likeButton) {
      throw new Error('Elementos esenciales de la tarjeta no encontrados');
    }

    this._renderCard();
    this._setEventListeners();
    this._updateLikeButton();
    this._handleDeleteButtonVisibility();
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".cards__item").cloneNode(true);
  }

  _renderCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () =>
        this._handleDeleteClick(this._cardId, this._element)
      );
    }

    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => this._toggleLike());
    }
  }

  _handleDeleteButtonVisibility() {
    if (this._deleteButton) {
      // Mostrar siempre el botón de borrar
      this._deleteButton.style.display = "flex";
      
      // Opcional: Si quieres mantener la lógica de owner pero solo cambiar la visibilidad
      // this._deleteButton.style.display = "block";
      // Puedes mantener otras lógicas relacionadas con el owner si las necesitas
    }
  }

  _toggleLike() {
    this._handleLikeClick(this._cardId, this._isLiked)
      .then((cardData) => {
        this._isLiked = !this._isLiked;
        if (cardData && cardData.likes) {
          this._likeCount.textContent = cardData.likes.length;
        }
        this._updateLikeButton();
      })
      .catch((err) => {
        console.error("Error al actualizar like:", err);
        this._likeButton.classList.toggle("cards__item-button_active");
      });
  }

  _updateLikeButton() {
    this._likeButton.classList.toggle("cards__item-button_active", this._isLiked);
  }

  getCardElement() {
    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}