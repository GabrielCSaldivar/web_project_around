// FormValidator.js
export class FormValidator {
  constructor(config, formElement) {
    this._config = config; // Configuración (selectores y clases)
    this._formElement = formElement; // Formulario a validar
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); // Campos de entrada
    this._submitButton = formElement.querySelector(config.submitButtonSelector); // Botón de submit
  }

  // Método privado: Verificar la validez de un campo de entrada
  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`#${input.name}-error`);
    if (input.validity.valueMissing) {
      this._showInputError(input, errorElement, 'Este campo es obligatorio');
    } else if (input.validity.tooShort) {
      this._showInputError(input, errorElement, `Mínimo de ${input.minLength} caracteres`);
    } else if (input.validity.typeMismatch && input.type === 'url') {
      this._showInputError(input, errorElement, 'Debe ser una URL válida');
    } else {
      this._hideInputError(input, errorElement);
    }
  }

  // Método privado: Mostrar error de validación en el campo
  _showInputError(input, errorElement, errorMessage) {
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // Método privado: Ocultar el error de validación del campo
  _hideInputError(input, errorElement) {
    input.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  // Método privado: Verificar si algún campo es inválido
  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  // Método privado: Habilitar o deshabilitar el botón de submit según la validez de los campos
  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  // Método privado: Añadir controladores de eventos a los campos
  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleSubmitButton();
      });
    });
  }

  // Método público: Activar la validación en el formulario
  enableValidation() {
    this._setEventListeners();
    this._toggleSubmitButton();
  }
}

// Configuración para la validación
export const formConfig = {
  formSelector: '.popup__container', // Selector para el formulario
  inputSelector: '.popup__form-first, .popup__form-second', // Selectores para los campos de entrada
  submitButtonSelector: '.popup__form-button', // Selector para el botón de submit
  inactiveButtonClass: 'popup__form-button_disabled', // Clase para el botón deshabilitado
  inputErrorClass: 'popup__input_type_error', // Clase para el campo de entrada con error
  errorClass: 'popup__error_visible', // Clase para el mensaje de error visible
};
