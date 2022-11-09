const { v4: uuid } = require('uuid');
const HTTP_STATUS = require('../../constants/api.constants');
const { HttpError } = require('../../utils/api.utils');

class MemoryContainer {
  constructor(resource) {
    this.items = [];
    this.resource = resource; // productos, carrito, usuarios, etc.
  }

  getAll() {
    return [...this.items];
  }

  getById(id) {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      const message = `${this.resource} with id ${id} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return item;
  }

  save(item) {
    const newItem = {
      id: uuid(),
      ...item,
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id, item) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index < 0) {
      const message = `${this.resource} with id ${id} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const updatedItem = {
      id,
      ...item,
    };
    this.items[index] = updatedItem;
    return updatedItem;
  }

  delete(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index < 0) {
      const message = `${this.resource} with id ${id} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    return this.items.splice(index, 1);
  }
}

module.exports = MemoryContainer;
