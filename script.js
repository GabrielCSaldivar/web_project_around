const page = document.querySelector(".page");

const editButton = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

const cardsContainer = document.querySelector(".cards__container");
const cardsTemplate = document.querySelector("#card-template");
const profileButton = document.querySelector(".profile__add");

const popUpOverlay = document.querySelector(".popup__overlay");

const popUp = document.querySelector(".popup__container");
const closePopUpButton = document.querySelector(".popup__close");
const firstInput = document.querySelector(".popup__form-first");
const secondInput = document.querySelector(".popup__form-second");
const popUpFormTitle = document.querySelector(".form__form-title");
const popUpFormButton = document.querySelector(".popup__form-button");

const bigImage = document.querySelector(".bigimage");
const bigImageContainer = document.querySelector(".bigimage__container");
const bigImageElement = document.querySelector(".bigimage__img");
const bigImageTitle = document.querySelector(".bigimage__title");
const closeBigImageButton = document.querySelector(".bigimage__close");

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

  popUpOverlay.onclick = function () {
    popUp.classList.remove("popup__opened");
    popUpOverlay.classList.remove("popup__overlay_opened");
  };
  closePopUpButton.addEventListener("click", function () {
    popUp.classList.remove("popup__opened");
    popUpOverlay.classList.remove("popup__overlay_opened");
  });

  const className = event.currentTarget.className;

  switch (className) {
    case "profile__edit":
      popUpFormTitle.textContent = "Editar Perfil";
      popUpFormButton.textContent = "Guardar";
      firstInput.placeholder = "Nombre";
      secondInput.placeholder = "Acerca de mi";
      firstInput.value = profileName.textContent;
      secondInput.value = profileOccupation.textContent;
      break;
    case "profile__add":
      popUpFormTitle.textContent = "Nuevo Lugar";
      popUpFormButton.textContent = "Crear";
      firstInput.placeholder = "Título";
      secondInput.placeholder = "Enlace a la imagen";
      break;
  }
}

// Manejo del formulario
function handleFormSubmit(e) {
  e.preventDefault();
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

// Cerrar la imagen grande
function closeBigImage() {
  bigImage.classList.remove("bigimage__opened");
}

closeBigImageButton.addEventListener("click", closeBigImage);
bigImage.addEventListener("click", closeBigImage);