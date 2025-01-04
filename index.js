// index.js
import { Card } from './Card.js';  // Asegúrate de que la ruta sea correcta
import { FormValidator, formConfig } from './FormValidator.js';
import { openEditAddPopUp, handleFormSubmit, closeBigImage } from './utils.js';

// Variables de los elementos del DOM
const editButton = document.querySelector(".profile__edit");
const cardsContainer = document.querySelector(".cards__container");
const profileButton = document.querySelector(".profile__add");
const popUp = document.querySelector("#popup__form");
const bigImage = document.querySelector(".bigimage");
const closeBigImageButton = bigImage.querySelector(".bigimage__close");

// Inicialización de la validación del formulario
const editFormValidator = new FormValidator(formConfig, popUp); 
editFormValidator.enableValidation();

// Inicialización de las tarjetas
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];

// Crear las tarjetas dinámicamente usando la clase Card
initialCards.forEach((card) => {
  const cardInstance = new Card(card.name, card.link, "#card-template");
  cardsContainer.prepend(cardInstance.getCardElement());
});

// Agregar los eventos para abrir el popup y manejar el formulario
editButton.addEventListener("click", openEditAddPopUp);
profileButton.addEventListener("click", openEditAddPopUp);
popUp.addEventListener("submit", (e) => handleFormSubmit(e, cardsContainer));
closeBigImageButton.addEventListener("click", closeBigImage);
bigImage.addEventListener("click", function (event) {
  if (event.target === bigImage) {
    closeBigImage();
  }
});