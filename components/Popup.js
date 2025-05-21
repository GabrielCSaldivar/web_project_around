export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._overlay = this._popup.querySelector('.popup__overlay');
    if (!this._popup) {
      console.error(`Popup no encontrado: ${popupSelector}`);
      return;
    }

    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeButton = this._popup.querySelector('.popup__close') || 
                       this._popup.querySelector('[data-close]');
    
    if (!this._closeButton) {
      console.warn(`Botón cerrar no encontrado en ${popupSelector}. Se cerrará solo con ESC o click fuera`);
    }

    this._setEventListeners();
  }

  open() {
    if (!this._popup) return;
    this._popup.classList.add('popup__opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    if (!this._popup) return;
    this._popup.classList.remove('popup__opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    if (this._closeButton) {
      this._closeButton.addEventListener('click', () => this.close());
    }

    if (this._overlay) {
      this._overlay.addEventListener('click', () => this.close());
    }
    
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup || evt.target.classList.contains('popup__overlay')) {
        this.close();
      }
    });
  }
}