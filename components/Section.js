export class Section {
  constructor({ items = [], renderer }, containerSelector) {
    if (!renderer || typeof renderer !== 'function') {
      throw new Error('Renderer debe ser una función');
    }

    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

    if (!this._container) {
      console.error(`Contenedor no encontrado: ${containerSelector}`);
    }
  }

  render() {
    if (!Array.isArray(this._items)) {
      console.error('Items debe ser un array');
      return;
    }

    try {
      this._items.forEach(item => {
        this._renderer(item);
      });
    } catch (error) {
      console.error('Error al renderizar items:', error);
    }
  }

  addItem(element) {
    if (this._container && element) {
      this._container.prepend(element);
    }
  }
}