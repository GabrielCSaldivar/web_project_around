// PopupWithImage.js
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".bigimage__img");  // Imagen
    this._popupTitle = this._popup.querySelector(".bigimage__title"); // Título
  }

  open(name, link) {
    this._popupImage.src = link;  // Establecemos el src de la imagen
    this._popupImage.alt = name;  // Agregamos el alt para la accesibilidad
    this._popupTitle.textContent = name;  // Establecemos el título de la imagen
    this._popup.classList.add("bigimage__opened");  // Agregamos la clase para abrir el popup
    super.open();  // Llamamos al método open() de la clase base para manejar el overlay
  }

  close() {
    this._popup.classList.remove("bigimage__opened");  // Quitamos la clase para cerrar el popup
    super.close();  // Llamamos al método close() de la clase base
  }
}
