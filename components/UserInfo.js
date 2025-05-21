export class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    // Validación de selectores
    if (!nameSelector || !aboutSelector) {
      throw new Error("Los selectores nameSelector y aboutSelector son requeridos");
    }

    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = avatarSelector ? document.querySelector(avatarSelector) : null;

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

  /**
   * Obtiene la información actual del usuario
   * @returns {Object} Objeto con name, about y avatar
   */
  getUserInfo() {
    return {
      name: this._nameElement?.textContent || "",
      about: this._aboutElement?.textContent || "",
      avatar: this._avatarElement?.src || ""
    };
  }

  /**
   * Establece la información del usuario
   * @param {Object} userData - Objeto con name, about y/o avatar
   */
  setUserInfo({ name, about, avatar }) {
    if (name !== undefined && this._nameElement) {
      this._nameElement.textContent = name;
    }

    if (about !== undefined && this._aboutElement) {
      this._aboutElement.textContent = about;
    }

    if (avatar !== undefined && this._avatarElement) {
      this._setAvatar(avatar);
    }
  }

  /**
   * Establece la imagen de avatar con manejo de errores
   * @param {string} avatarUrl - URL de la imagen de avatar
   */
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

  /**
   * Actualiza solo el avatar
   * @param {string} avatarUrl - URL de la nueva imagen de avatar
   */
  setAvatar(avatarUrl) {
    this._setAvatar(avatarUrl);
  }

  /**
   * Obtiene el ID del elemento de avatar (si existe)
   * @returns {string|null} ID del elemento de avatar
   */
  getAvatarId() {
    return this._avatarElement?.id || null;
  }
}