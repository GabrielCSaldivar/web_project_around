// Section.js
export class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;  // Array de datos (las tarjetas)
      this._renderer = renderer;  // Función de renderizado
      this._container = document.querySelector(containerSelector);  // Selector del contenedor
    }
  
    // Método que renderiza todos los elementos
    render() {
      this._items.forEach(item => {
        this._renderer(item);
      });
    }
  
    // Método que agrega un solo elemento al contenedor
    addItem(element) {
      this._container.prepend(element);
    }
  }