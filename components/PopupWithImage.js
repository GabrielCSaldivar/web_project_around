import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    
    if (!this._popup) return;

    this._imageElement = this._popup.querySelector('.popup__image');
    this._captionElement = this._popup.querySelector('.popup__caption');
    
    if (!this._imageElement || !this._captionElement) {
      console.error('Elementos de imagen no encontrados:', this._popup.innerHTML);
    }
  }

  open(name, link) {
    if (this._imageElement && this._captionElement) {
      this._imageElement.src = link;
      this._imageElement.alt = name;
      this._captionElement.textContent = name;
    }
    super.open();
  }
}