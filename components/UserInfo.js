export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    if (!nameSelector || !aboutSelector) {
      throw new Error("Los selectores nameSelector y aboutSelector son requeridos");
    }

    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = avatarSelector ? document.querySelector(avatarSelector) : null;
    this._userId = null;

    if (!this._nameElement) {
      console.error(`Elemento no encontrado: ${nameSelector}`);
    }
    if (!this._aboutElement) {
      console.error(`Elemento no encontrado: ${aboutSelector}`);
    }
    if (avatarSelector && !this._avatarElement) {
      console.error(`Elemento no encontrado: ${avatarSelector}`);
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement?.textContent || "",
      about: this._aboutElement?.textContent || "",
      avatar: this._avatarElement?.src || ""
    };
  }

  getUserId() {
    return this._userId;
  }

  setUserInfo({ name, about, avatar, _id }) {
    if (name !== undefined && this._nameElement) {
      this._nameElement.textContent = name;
    }

    if (about !== undefined && this._aboutElement) {
      this._aboutElement.textContent = about;
    }

    if (avatar !== undefined && this._avatarElement) {
      this._setAvatar(avatar);
    }

    if (_id !== undefined) {
    this._userId = _id;
  }
  }

  _setAvatar(avatarUrl) {
    if (!this._avatarElement) return;

    const tempImage = new Image();
    tempImage.onload = () => {
      this._avatarElement.src = avatarUrl;
      this._avatarElement.alt = "Avatar del usuario";
    };
    tempImage.onerror = () => {
      console.error("Error al cargar el avatar:", avatarUrl);
      this._avatarElement.src = "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg";
    };
    tempImage.src = avatarUrl;
  }
}