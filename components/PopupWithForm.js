import { Popup } from './Popup.js';
import { FormValidator } from './FormValidator.js'; // Importamos FormValidator

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Llamamos al constructor de Popup
    this._handleFormSubmit = handleFormSubmit; // Función que maneja el envío del formulario
    this._form = document.querySelector('.popup'); // El formulario dentro del popup
    this._formTitle = this._popup.querySelector(".form__form-title"); // El título del formulario
    this._submitButton = this._popup.querySelector("#btnText"); // El botón de submit
    this._config = {
      inputSelector: '.popup__form-first, .popup__form-second', // Selectores para los inputs
      submitButtonSelector: '#btnText', // Selector para el botón de submit
      inputErrorClass: 'popup__input_type_error', // Clase de error en los inputs
      errorClass: 'popup__error_visible', // Clase para mostrar el mensaje de error
      inactiveButtonClass: 'popup__form-button_disabled', // Clase para el botón deshabilitado
    };
  }

  // Método que se encarga de recopilar los valores del formulario
  _getInputValues() {
    const inputs = this._form ? this._form.querySelectorAll('input') : []; // Todos los campos de entrada
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value; // Extraemos los valores de cada campo
    });
    return values;
  }

open(data = null) {
    super.open(); // Llamamos al método open() de la clase Popup
    
    // Inicializamos el validador solo cuando el formulario se abre
    if (this._form) {
        this._formValidator = new FormValidator(this._config, this._form); // Inicializamos el validador
        this._formValidator.enableValidation(); // Activamos la validación del formulario
    }

    // Si estamos en el formulario de edición de perfil, precargamos los datos del perfil actual
    if (data) {
        this._form.querySelector('[name="name"]').value = data.name;
        this._form.querySelector('[name="about"]').value = data.occupation;
        this._form.querySelector('[name="name"]').setAttribute('placeholder', 'Nombre');
        this._form.querySelector('[name="about"]').setAttribute('placeholder', 'Ocupación');
    } else {
        // Si no pasamos datos, aseguramos que los campos estén vacíos
        this._form.querySelector('[name="name"]').value = '';
        this._form.querySelector('[name="about"]').value = '';
        this._form.querySelector('[name="name"]').setAttribute('placeholder', 'Título');
        this._form.querySelector('[name="about"]').setAttribute('placeholder', 'URL');
    }

    // Aseguramos que el popup esté visible
    this._form.classList.add("popup__opened");
}

  // Método para agregar los event listeners, incluido el submit
  setEventListeners() {
    if (!this._form) return; // Si no se encuentra el formulario, no agregamos el event listener

    super.setEventListeners(); // Mantenemos la lógica de cierre del popup (escuchar el clic fuera del popup)

    // Agregar el evento submit al formulario
    this._form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevenimos el comportamiento predeterminado (recarga de la página)
      const formValues = this._getInputValues(); // Obtenemos los valores del formulario
      this._handleFormSubmit(formValues); // Llamamos a la función de manejo del submit con los valores
      this.close(); // Cerramos el popup después de enviar el formulario
    });
  }

  // Método para cerrar y resetear el formulario
  close() {
    super.close(); // Cerramos el popup (heredado de la clase Popup)
    if (this._form) {
      this._form.reset(); // Reseteamos el formulario después de enviarlo
    }
  }
}