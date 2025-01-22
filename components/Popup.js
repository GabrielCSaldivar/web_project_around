// Popup.js
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector); // Popup
    this._popupOverlay = this._popup.querySelector('.popup__overlay'); // Overlay del popup
    this._closeButton = this._popup.querySelector(".popup__close"); // Botón de cerrar
    this._handleEscClose = this._handleEscClose.bind(this); // Asegura que funcione correctamente el this al manejar eventos
  }

  // Método para abrir el popup
  open() {
    if (this._popupOverlay) {
      this._popupOverlay.classList.add("popup__overlay_opened");  // Agregar la clase overlay abierto
    }
    if (this._popup) {
      this._popup.classList.add("popup__opened");  // Agregar la clase popup abierto
    }
    document.addEventListener("keydown", this._handleEscClose); // Escuchar para presionar "Esc"
  }

  // Método para cerrar el popup
  close() {
    if (this._popupOverlay) {
      this._popupOverlay.classList.remove("popup__overlay_opened"); // Remover la clase overlay abierto
    }
    if (this._popup) {
      this._popup.classList.remove("popup__opened");  // Remover la clase popup abierto
    }
    document.removeEventListener("keydown", this._handleEscClose); // Dejamos de escuchar "Esc"
  }

  // Cerrar el popup cuando se presiona "Escape"
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close(); // Cerrar popup si presionan "Escape"
    }
  }

  // Agregar los event listeners para cerrar el popup
  setEventListeners() {
    // Verificamos si el botón de cierre y el overlay existen antes de asignar el evento
    if (this._closeButton) {
      this._closeButton.addEventListener("click", () => {
        this.close();
      });
    }

    if (this._popupOverlay) {
      this._popupOverlay.addEventListener("click", (e) => {
        // Solo cerramos si se hace clic directamente en el overlay, no en el contenido
        if (e.target === this._popupOverlay) {
          this.close();
        }
      });
    }
  }
}