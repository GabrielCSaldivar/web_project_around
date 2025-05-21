import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';

const apiConfig = {
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b41440c3-9099-4063-b2dc-6c28fab9d152",
    "Content-Type": "application/json"
  }
};

const api = new Api(apiConfig);
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__image"
});

let section;
let userId;

const popupWithImage = new PopupWithImage("#popup-image");
const popupWithConfirmation = new PopupWithConfirmation(
  '#popup-confirm-delete',
  (cardId, cardElement) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        popupWithConfirmation.close();
      })
      .catch(err => {
        console.error('Error al eliminar tarjeta:', err);
      });
  }
);

const popupEditProfile = new PopupWithForm(
  "#popup-edit-profile",
  (inputValues) => {
    popupEditProfile.renderLoading(true);
    api.editUser(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch(console.error)
      .finally(() => popupEditProfile.renderLoading(false));
  }
);

const popupAddCard = new PopupWithForm(
  "#popup-add-card",
  (inputValues) => {
    popupAddCard.renderLoading(true, 'Creando...');
    api.createCard(inputValues)
      .then((cardData) => {
        const card = createCard(cardData);
        section.addItem(card.getCardElement());
        popupAddCard.close();
      })
      .catch(console.error)
      .finally(() => popupAddCard.renderLoading(false));
  }
);

const popupUpdateAvatar = new PopupWithForm(
  "#popup-update-avatar",
  (inputValues) => {
    popupUpdateAvatar.renderLoading(true);
    api.updateAvatar(inputValues)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupUpdateAvatar.close();
      })
      .catch(console.error)
      .finally(() => popupUpdateAvatar.renderLoading(false));
  }
);

function createCard(cardData) {
  const card = new Card(
    cardData.name,
    cardData.link,
    "#card-template",
    handleCardClick,
    cardData._id,
    cardData.isLiked,
    userId,
    cardData.owner._id,
    api
  );
  card.setDeleteHandler(handleDeleteClick);
  return card;
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteClick(cardId, cardElement) {
  popupWithConfirmation.open(cardId, cardElement);
}

document.querySelector(".profile__edit").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  popupEditProfile.open();
});

document.querySelector(".profile__add").addEventListener("click", () => {
  popupAddCard.open();
});

document.querySelector(".profile__image-container").addEventListener("click", () => {
  popupUpdateAvatar.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData = []]) => {
    if (!userData || !Array.isArray(cardsData)) {
      throw new Error('Datos iniciales inválidos');
    }

    userInfo.setUserInfo(userData);
    userId = userData._id;

    section = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          try {
            const card = createCard(item);
            section.addItem(card.getCardElement());
          } catch (error) {
            console.error('Error al crear tarjeta:', error);
          }
        }
      },
      ".cards__container"
    );

    section.render();
  })
  .catch(error => {
    console.error('Error al cargar datos iniciales:', error);
  });

  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      validator.enableValidation();
      
      formElement.closest('.popup').addEventListener('click', (e) => {
        if (e.target.classList.contains('popup__close') || 
            e.target.classList.contains('popup__overlay')) {
          formElement.reset();
          formElement.querySelectorAll('.popup__input').forEach(input => {
            input.classList.remove('touched');
          });
          validator.resetFormValidation();
        }
      });
    });
  };

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});