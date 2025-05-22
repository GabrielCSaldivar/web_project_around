import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    
    if (!this._popup) {
      console.error(`Popup no encontrado: ${popupSelector}`);
      return;
    }

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    
    if (!this._form) {
      console.error(`Formulario no encontrado en ${popupSelector}`);
      return;
    }

    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__button');
    
    if (this._form && this._submitButton) {
      this._setEventListeners();
    } else {
      console.error('Elementos del formulario no encontrados correctamente');
    }
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    
    if (this._form) {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    }
  }

  open(data) {
    super.open();
    if (data) {
      this.setInputValues(data);
    }
  }

  close() {
    super.close();
    if (this._form) {
      this._form.reset();
    }
  }

  renderLoading(isLoading, message = 'Guardando...') {
    if (this._submitButton) {
      this._submitButton.textContent = isLoading ? message : 'Guardar';
      this._submitButton.disabled = isLoading;
    }
  }
}