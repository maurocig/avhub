const MemoryContainer = require('./memory.container');
const { createFakeUser } = require('../../utils/user.utils');

class MockContainer extends MemoryContainer {
  constructor(resource) {
    super(resource); // con super le paso los parámetros al constructor del contenedor padre.
  }

  populate(qty = 50) {
    this.items = [];
    for (let i = 1; i <= qty; i++) {
      const newItem = createFakeUser();
      this.items.push(newItem);
    }
    return this.items;
  }

  save() {
    const newUser = createFakeUser();
    this.items.push(newUser);
    return newUser;
  }
}

module.exports = {
  MockContainer,
};
