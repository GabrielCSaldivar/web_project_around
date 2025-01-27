// index.js
import { Card, initialCards } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

document.addEventListener('DOMContentLoaded', () => {
  // Instanciamos UserInfo para acceder a los datos del usuario
  const userInfo = new UserInfo({
    nameSelector: ".profile__name",
    occupationSelector: ".profile__occupation",
  });

  // Creamos la instancia de PopupWithImage para mostrar las imágenes grandes
  const popupWithImage = new PopupWithImage("#popup__bigimage");
  popupWithImage.setEventListeners(); // Aseguramos que los eventos se configuren correctamente

  // Creamos la instancia de PopupWithForm para el formulario de editar perfil o agregar tarjeta
  const popupWithForm = new PopupWithForm("#popup__form", (inputValues) => {
    const { name, about, link } = inputValues;

    // Si el formulario es para editar el perfil
    if (popupWithForm._formTitle === "Editar Perfil") {
      userInfo.setUserInfo({ name, occupation: about });
    }
    
    // Si el formulario es para agregar una nueva tarjeta
    else if (popupWithForm._formTitle === "Nuevo Lugar") {
      const newCard = new Card(name, about, "#card-template", handleCardClick);
      section.addItem(newCard.getCardElement());
    }
  });

  // Asegúrate de que setEventListeners se llame después de que el DOM esté completamente cargado
  popupWithForm.setEventListeners();

  // Función para manejar el clic en una tarjeta y abrir la imagen en grande
  function handleCardClick(name, link) {
    popupWithImage.open(name, link); // Abrimos el popup con la imagen grande
  }

  // Instanciamos la clase Section para gestionar las tarjetas
  const section = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const card = new Card(item.name, item.link, "#card-template", handleCardClick);
        section.addItem(card.getCardElement());
      },
    },
    ".cards__container"
  );

  // Renderizamos las tarjetas en el contenedor
  section.render();

  // Agregar eventos para abrir el popup del formulario (Editar perfil o Agregar lugar)
  document.querySelector(".profile__edit").addEventListener("click", () => {
    const { name, occupation } = userInfo.getUserInfo();
    const button = document.querySelector(".popup__form-button")
    button.textContent = "Guardar";
    const editProfileTitle = document.querySelector(".form__form-title");
    editProfileTitle.textContent = "Editar Perfil"; // Establece el título del formulario
    popupWithForm._formTitle = "Editar Perfil"; // Establece el título interno
    popupWithForm.open({ name, occupation }); // Abre el popup con los datos
  });
  
  document.querySelector(".profile__add").addEventListener("click", () => {
    const editPlaceTitle = document.querySelector(".form__form-title");
    const button = document.querySelector(".popup__form-button")
    button.textContent = "Crear";
    editPlaceTitle.textContent = "Nuevo Lugar"; // Establece el título del formulario
    popupWithForm._formTitle = "Nuevo Lugar"; // Establece el título interno
    popupWithForm.open(); // Abre el popup vacío
  });
});
