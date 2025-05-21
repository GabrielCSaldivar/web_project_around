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
    api
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
    this._api = api;

    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".cards__item-img");
    this._cardTitle = this._element.querySelector(".cards__item-title");
    this._deleteButton = this._element.querySelector(".cards__item-delete");
    this._likeButton = this._element.querySelector(".cards__item-button");

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
        this._handleDeleteClick()
      );
    }

    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => this._toggleLike());
    }
  }

  _handleDeleteButtonVisibility() {
    if (this._deleteButton && this._userId !== this._ownerId) {
      this._deleteButton.style.display = "block";
    }
  }

  _handleDeleteClick() {
    if (this._handleDeleteConfirmation) {
      this._handleDeleteConfirmation(this._cardId, this._element);
    }
  }

  setDeleteHandler(handleDeleteConfirmation) {
    this._handleDeleteConfirmation = handleDeleteConfirmation;
  }

  _toggleLike() {
    this._api.toggleLike(this._cardId, this._isLiked)
      .then((cardData) => {
        this._isLiked = !this._isLiked;
        this._updateLikeButton();
      })
      .catch((err) => {
        console.error("Error al actualizar like:", err);
      });
  }

  _updateLikeButton() {
    if (this._likeButton) {
      this._likeButton.classList.toggle("cards__item-button_active", this._isLiked);
    }
  }

  getCardElement() {
    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }
}