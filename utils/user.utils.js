const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');

faker.locale = 'es';

const createFakeUser = () => {
  return {
    id: uuid(),
    nombre: faker.name.fullName(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    image: faker.image.avatar(),
  };
};

module.exports = {
  createFakeUser,
};
