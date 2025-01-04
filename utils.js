// utils.js

import { Card } from './Card.js';  // Asegúrate de que la ruta sea correcta

// Función para cerrar el popup
export function closePopUp(popUp, popUpOverlay) {
  popUp.classList.remove("popup__opened");
  popUpOverlay.classList.remove("popup__overlay_opened");
}

// Función para cerrar la ventana de la imagen grande
export function closeBigImage() {
  const bigImage = document.querySelector(".bigimage");
  bigImage.classList.remove("bigimage__opened");
}

// Función para abrir el popup y configurar el formulario según el tipo de acción (editar o agregar)
export function openEditAddPopUp(event) {
  const popUp = document.querySelector("#popup__form");
  const popUpOverlay = document.querySelector(".popup__overlay");
  const closePopUpButton = document.querySelector(".popup__close");
  const firstInput = document.querySelector(".popup__form-first");
  const secondInput = document.querySelector(".popup__form-second");
  const popUpFormTitle = document.querySelector(".form__form-title");
  const popUpFormButton = document.querySelector(".popup__form-button");
  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");

  popUp.classList.add("popup__opened");
  popUpOverlay.classList.add("popup__overlay_opened");

  popUpOverlay.onclick = () => {
    popUp.classList.remove("popup__opened");
    popUpOverlay.classList.remove("popup__overlay_opened");
  };

  closePopUpButton.addEventListener("click", function () {
    popUp.classList.remove("popup__opened");
    popUpOverlay.classList.remove("popup__overlay_opened");
  });

  // Resetear los valores del formulario al abrir
  firstInput.value = '';
  secondInput.value = '';

  const className = event.currentTarget.className;

  switch (className) {
    case "profile__edit":
      popUpFormTitle.textContent = "Editar Perfil";
      popUpFormButton.textContent = "Guardar";
      firstInput.placeholder = "Nombre";
      secondInput.placeholder = "Acerca de mí";
      firstInput.value = profileName.textContent;
      secondInput.value = profileOccupation.textContent;
      firstInput.maxLength = 40;
      firstInput.minLength = 2;
      secondInput.maxLength = 200;
      secondInput.minLength = 2;
      secondInput.type = "text";
      break;
    case "profile__add":
      popUpFormTitle.textContent = "Nuevo Lugar";
      popUpFormButton.textContent = "Crear";
      firstInput.placeholder = "Título";
      secondInput.placeholder = "Enlace a la imagen";
      firstInput.minLength = 0;
      firstInput.maxLength = undefined;
      firstInput.value = '';
      secondInput.value = '';
      firstInput.maxLength = 30;
      firstInput.minLength = 2;
      secondInput.type = "url";
      break;
  }
}

// Manejo del formulario para editar el perfil o agregar una nueva tarjeta
export function handleFormSubmit(e, cardsContainer) {
  e.preventDefault();

  const popUpFormButton = document.querySelector(".popup__form-button");
  const firstInput = document.querySelector(".popup__form-first");
  const secondInput = document.querySelector(".popup__form-second");
  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");
  const popUp = document.querySelector("#popup__form");
  const popUpOverlay = document.querySelector(".popup__overlay");

  if (popUpFormButton.disabled) return; // No hacer nada si el botón está deshabilitado

  const buttonText = popUpFormButton.textContent.trim();
  if (buttonText === "Guardar") {
    // **Editar el perfil**
    profileName.textContent = firstInput.value;
    profileOccupation.textContent = secondInput.value;
  } else if (buttonText === "Crear") {
    // **Crear una nueva tarjeta**
    const card = {
      name: firstInput.value,
      link: secondInput.value
    };
    const cardInstance = new Card(card.name, card.link, "#card-template");
    cardsContainer.prepend(cardInstance.getCardElement());
  }

  // **Cerrar el popup después de la acción**
  popUp.classList.remove("popup__opened");
  popUpOverlay.classList.remove("popup__overlay_opened");

  // **Resetear el formulario después de submit** (Opcional, dependiendo de tus necesidades)
  firstInput.value = '';
  secondInput.value = '';
}
