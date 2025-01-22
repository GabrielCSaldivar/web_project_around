// UserInfo.js
export class UserInfo {
    constructor({ nameSelector, occupationSelector }) {
      // Seleccionamos los elementos del DOM donde se encuentra el nombre y la ocupación del usuario
      this._nameElement = document.querySelector(nameSelector);
      this._occupationElement = document.querySelector(occupationSelector);
    }
  
    // Método para obtener la información del usuario (nombre y ocupación)
    getUserInfo() {
      return {
        name: this._nameElement.textContent,
        occupation: this._occupationElement.textContent,
      };
    }
  
    // Método para actualizar la información del usuario en el DOM
    setUserInfo({ name, occupation }) {
      this._nameElement.textContent = name;
      this._occupationElement.textContent = occupation;
    }
  }