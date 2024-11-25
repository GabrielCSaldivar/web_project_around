import { enableValidation } from './validate.js';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector(".page");

  const editButton = document.querySelector(".profile__edit");
  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");

  const cardsContainer = document.querySelector(".cards__container");
  const cardsTemplate = document.querySelector("#card-template");
  const profileButton = document.querySelector(".profile__add");

  const popUpOverlay = document.querySelector(".popup__overlay");
  const popUp = document.querySelector("#popup__form");
  const closePopUpButton = document.querySelector(".popup__close");
  const firstInput = document.querySelector(".popup__form-first");
  const secondInput = document.querySelector(".popup__form-second");
  const popUpFormTitle = document.querySelector(".form__form-title");
  const popUpFormButton = document.querySelector(".popup__form-button");

  const bigImage = document.querySelector(".bigimage");
  const bigImageElement = bigImage.querySelector(".bigimage__img");
  const bigImageTitle = bigImage.querySelector(".bigimage__title");
  const closeBigImageButton = bigImage.querySelector(".bigimage__close");

    // Función para cerrar el popup
    function closePopUp() {
      popUp.classList.remove("popup__opened");
      popUpOverlay.classList.remove("popup__overlay_opened");
    }
  
    // Cerrar el popup si el usuario presiona la tecla "Esc"
    document.addEventListener('keydown', function (event) {
      if (event.key === "Escape") {
        if (popUp.classList.contains("popup__opened")) {
          closePopUp();
        }
        if (bigImage.classList.contains("bigimage__opened")) {
          bigImage.classList.remove("bigimage__opened");
        }
      }
    });

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

  // Crear las tarjetas dinámicamente
  initialCards.forEach((card) => {
    let cardElement = createCard(card);
    cardsContainer.prepend(cardElement);
  });

  function createCard(card) {
    let cardElement = cardsTemplate.content.querySelector(".cards__item").cloneNode(true);
    const cardImage = cardElement.querySelector(".cards__item-img");
    const cardTitle = cardElement.querySelector(".cards__item-title");

    cardImage.src = card.link;
    cardTitle.textContent = card.name;

    // Asignar evento para abrir la imagen en grande
    cardImage.addEventListener("click", openBigImage);

    // Función para eliminar la tarjeta
    deleteItemTrashButton(cardElement);
    // Función para cambiar el estado del like
    toggleItemLikeButton(cardElement);

    return cardElement;
  }

  // Eliminar tarjeta
  function deleteItemTrashButton(card) {
    let deleteButton = card.querySelector(".cards__item-delete");
    deleteButton.addEventListener("click", function () {
      card.remove();
      deleteItemTrashButton(card);
    });
  }

  // Cambiar estado del botón de like
  function toggleItemLikeButton(card) {
    let likeButton = card.querySelector(".cards__item-button");
    likeButton.addEventListener("click", function () {
      likeButton.classList.toggle("cards__item-button_active");
    });
  }

  // Función para abrir el popup para agregar/editar
  function openEditAddPopUp(event) {
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

    enableValidation({
      formSelector: '.popup__container',
      inputSelector: '.popup__form-first, .popup__form-second',
      submitButtonSelector: '.popup__form-button',
      inactiveButtonClass: 'popup__form-button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible',
    });
  }

  // Manejo del formulario
  function handleFormSubmit(e) {
    e.preventDefault();

    if (popUpFormButton.disabled) return; // No hacer nada si el botón está deshabilitado

    const buttonText = e.target.innerText;

    switch (buttonText) {
      case "Guardar":
        profileName.textContent = firstInput.value;
        profileOccupation.textContent = secondInput.value;
        break;
      case "Crear":
        const card = {
          name: firstInput.value,
          link: secondInput.value
        };
        let cardElement = createCard(card);
        cardsContainer.prepend(cardElement);
        break;
    }

    popUp.classList.remove("popup__opened");
    popUpOverlay.classList.remove("popup__overlay_opened");
  }

  editButton.addEventListener("click", openEditAddPopUp);
  profileButton.addEventListener("click", openEditAddPopUp);
  popUpFormButton.addEventListener("click", handleFormSubmit);

// Función para abrir la imagen grande
function openBigImage(event) {
  const imageSrc = event.currentTarget.src;
  const cardItem = event.currentTarget.closest(".cards__item");
  const titleText = cardItem.querySelector(".cards__item-title").textContent;
  bigImageTitle.textContent = titleText;
  bigImageElement.src = imageSrc;
  bigImage.classList.add("bigimage__opened");
}

// Cerrar la imagen grande solo si se hace clic en el overlay
function closeBigImage() {
  bigImage.classList.remove("bigimage__opened");
}

closeBigImageButton.addEventListener("click", closeBigImage);

// Cerrar el popup de la imagen cuando se haga clic fuera de la imagen (en el overlay)
bigImage.addEventListener("click", function(event) {
  if (event.target === bigImage) {
    closeBigImage();
  }
});

  // Aquí colocamos la configuración para la validación
  const config = {
    formSelector: '#popup__form',
    inputSelector: '.popup__form-first, .popup__form-second',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };  

  // Inicializar la validación
  enableValidation(config);
});
