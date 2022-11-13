const { v4: uuid } = require('uuid');
const fs = require('fs/promises');

const HTTP_STATUS = require('../../constants/api.constants');
const { HttpError } = require('../../utils/api.utils');

class MemoryContainer {
  constructor(resource) {
    this.resource = resource; // productos, carrito, usuarios, etc.
  }

  static async connect() {}

  async getFile() {
    const data = await fs.readFile(`${this.resource}`, 'utf-8');
    return JSON.parse(data);
  }

  async getAll() {
    const file = await this.getFile();
    return file;
  }

  async getById(id) {
    const file = await this.getFile();
    const array = file.filter((cart) => cart.id === id);
    if (array.length === 0) {
      const message = `Cart with id ${id} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    } else {
      return array[0];
    }
  }

  async save(item) {
    const file = await this.getFile();
    item.id = uuid();
    file.push(item);
    console.log(file);
    await fs.writeFile(`${this.resource}`, JSON.stringify(file, null, 2));
    return item;
  }

  async update(id, item) {
    const file = await this.getFile();
    const index = file.findIndex((item) => item.id === id);
    if (index < 0) {
      const message = `${this.resource} with id ${id} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    }
    const updatedItem = {
      id,
      ...item,
    };
    file[index] = updatedItem;
    await fs.writeFile(`${this.resource}`, JSON.stringify(file, null, 2));
    return updatedItem;
  }

  async delete(id) {
    const file = await this.getFile();
    const filteredArray = file.filter((product) => product.id !== id);
    if (filteredArray.length === file.length) {
      const message = `Resource with id ${id} does not exist in our records.`;
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
    } else {
      await fs.writeFile(
        `${this.resource}`,
        JSON.stringify(filteredArray, null, 2)
      );
      return;
    }
  }
}

module.exports = MemoryContainer;
