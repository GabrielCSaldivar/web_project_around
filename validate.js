export function enableValidation(config) {
  const formElements = document.querySelectorAll(config.formSelector);

  formElements.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(input, form, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (!hasInvalidInput(inputList)) {
        console.log("Form is valid and ready to be submitted.");
      }
    });
  });
}

function checkInputValidity(input, form, config) {

  console.log('minLength:', input.minLength);


  const errorElement = form.querySelector(`#${input.name}-error`);

  if (input.validity.valueMissing) {
    showInputError(input, errorElement, 'Por favor, rellena este campo', config);
  } else if (input.validity.tooShort) {
    showInputError(input, errorElement, `Por favor, rellena este campo con más de dos caracteres, solo has escrito ${input.value.length}`, config);
  } else if (input.validity.typeMismatch && input.type === 'url') {
    showInputError(input, errorElement, 'Por favor, introduce una dirección web válida', config);
  } else {
    hideInputError(input, errorElement, config);
  }
}

function showInputError(input, errorElement, errorMessage, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
