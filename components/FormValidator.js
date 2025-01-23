export class FormValidator {
  constructor(config, formElement) {
    this._config = config; // Configuración (selectores y clases)
    this._formElement = formElement; // Formulario a validar
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector)); // Campos de entrada
    this._submitButton = formElement.querySelector(config.submitButtonSelector); // Botón de submit
    this._isAddForm = formElement.querySelector('h2').textContent.includes("Lugar"); // Detectar si es el formulario de adición

    // Establecer el tipo de 'about' según el formulario
    this._setAboutInputType();
  }

  // Método privado: Establecer el tipo de 'about' según el formulario
  _setAboutInputType() {
    const aboutInput = this._formElement.querySelector('[name="about"]');
    if (this._isAddForm && aboutInput) {
      aboutInput.setAttribute("type", "url"); // Establecer tipo URL solo en el formulario de adición
    } else if (aboutInput) {
      aboutInput.setAttribute("type", "text"); // Cambiar a texto en otros formularios
    }
  }

  // Método privado: Verificar la validez de un campo de entrada
  _checkInputValidity(input) {
    const errorElement = this._formElement.querySelector(`#${input.name}-error`);

    // Validación de campo obligatorio (si está vacío), solo mostrar el error si el campo ha sido tocado y el usuario ha interactuado
    if (!input.value.trim() && input.dataset.touched) {
      this._showInputError(input, errorElement, 'Campo obligatorio');
      return false;
    }

    // Validación de longitud del valor (mínimo 2, máximo 30 caracteres)
    if (input.value.length < 2 && input.value.length > 0) {
      this._showInputError(input, errorElement, 'Mínimo de 2 caracteres');
      return false;
    }

    // Validación de longitud máxima para todos los campos, excepto el 'about' (URL)
    if (input.value.length > 30 && !(this._isAddForm && input.name === 'about' && input.type === 'url')) {
      this._showInputError(input, errorElement, 'Máximo de 30 caracteres');
      return false;
    }

    // Validación para URL (solo si es el campo 'about' en el formulario 'profile__add')
    if (this._isAddForm && input.name === 'about' && input.type === 'url' && input.validity.typeMismatch) {
      this._showInputError(input, errorElement, 'Debe ser una URL válida');
      return false;
    }

    // Si pasa todas las validaciones, ocultamos el error
    this._hideInputError(input, errorElement);
    return true;
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
    return this._inputList.some(input => !this._checkInputValidity(input));
  }

  // Método privado: Habilitar o deshabilitar el botón de submit según la validez de los campos
  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true; // Deshabilitar el botón
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false; // Habilitar el botón
    }
  }

  // Método privado: Añadir controladores de eventos a los campos
  _setEventListeners() {
    this._inputList.forEach(input => {
      // Marcar el campo como tocado cuando se interactúa con él
      input.addEventListener('focus', () => {
        input.dataset.touched = true; // Marcar que el campo ha sido tocado
      });

      // Validamos cuando el usuario empieza a escribir
      input.addEventListener('input', () => {
        this._checkInputValidity(input); // Verificamos la validez del campo
        this._toggleSubmitButton(); // Activamos o desactivamos el botón de submit
      });

      // También validamos cuando el campo pierde el foco
      input.addEventListener('focusout', () => {
        this._checkInputValidity(input);
      });
    });
  }

  // Método público: Activar la validación en el formulario
  enableValidation() {
    this.resetFormValidation();  // Limpiar los errores antes de habilitar la validación
    this._setEventListeners(); // Se añaden los eventos de validación
    this._toggleSubmitButton(); // Se ajusta el estado del botón de submit al inicio

    // Deshabilitar el botón de submit desde el principio si los campos están vacíos
    this._submitButton.disabled = true; // Deshabilitar el botón de submit por defecto
    this._submitButton.classList.add(this._config.inactiveButtonClass); // Añadir clase de botón inactivo
  }

  // Método público: Restablecer la validación para el formulario actual
  resetFormValidation() {
    this._setAboutInputType(); // Ajustar el tipo de input 'about' (text o url) según el formulario
    this._inputList.forEach(input => {
      delete input.dataset.touched; // Eliminar la marca de tocado
      this._hideInputError(input, this._formElement.querySelector(`#${input.name}-error`)); // Limpiar errores
    });
    this._toggleSubmitButton(); // Actualizar el estado del botón de submit
  }
}
