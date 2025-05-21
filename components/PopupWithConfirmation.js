import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    
    if (!this._popup) return;

    this._handleConfirm = handleConfirm;
    
    this._confirmButton = this._popup.querySelector('.popup__confirm-button') ||
                         this._popup.querySelector('[data-action="confirm"]');
    
    if (!this._confirmButton) {
      console.error('Botón no encontrado. HTML:', this._popup.innerHTML);
      return;
    }

    this._setEventListeners();
  }

  _setEventListeners() {
    if (!this._confirmButton) return;
    
    if (super._setEventListeners) {
      super._setEventListeners();
    }
    
    this._confirmButton.addEventListener('click', () => {
      if (this._cardId && this._cardElement) {
        this._handleConfirm(this._cardId, this._cardElement);
      }
      this.close();
    });
  }

  open(cardId, cardElement) {
    console.log(`Abriendo popup para cardId: ${cardId}`); // Debug
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }
}