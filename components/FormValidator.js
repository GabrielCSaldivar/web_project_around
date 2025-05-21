export class FormValidator {
  constructor(config, formElement) {
    if (!formElement) {
      console.error('Elemento formulario no proporcionado');
      return;
    }

    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._submitButton = formElement.querySelector(config.submitButtonSelector);
    this._toggleButtonState();
    this._setEventListeners();

    if (!this._submitButton) {
      console.error('Botón submit no encontrado:', formElement);
      return;
    }
  }

  _showInputError(input, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${input.name}-error`);
    if (errorElement) {
      input.classList.add(this._config.inputErrorClass);
      if (!errorElement.textContent.trim()) {
        errorElement.textContent = errorMessage;
      }
      errorElement.classList.add(this._config.errorClass);
    }
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.name}-error`);
    if (errorElement) {
      input.classList.remove(this._config.inputErrorClass);
      errorElement.classList.remove(this._config.errorClass);
      errorElement.textContent = '';
    }
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      let errorMessage = input.validationMessage;
      
      if (input.validity.valueMissing) {
        errorMessage = 'Este campo es obligatorio';
      } else if (input.validity.typeMismatch && input.type === 'url') {
        errorMessage = 'Ingresa una URL válida';
      } else if (input.validity.tooShort) {
        errorMessage = 'Mínimo 2 caracteres';
      }
  
      if (input.value.length > 0 || input.classList.contains('touched')) {
        this._showInputError(input, errorMessage);
      }
      return false;
    }
    
    this._hideInputError(input);
    return true;
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !this._checkInputValidity(input));
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('blur', () => {
        input.classList.add('touched');
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
  
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }

  resetFormValidation() {
    this._inputList.forEach(input => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}