const { faker } = require('@faker-js/faker');

const data = [
  {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    registeredAt: faker.date.past(),
  },

  {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    registeredAt: faker.date.past(),
  },

  {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    registeredAt: faker.date.past(),
  },

  {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    registeredAt: faker.date.past(),
  },

  {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    image: faker.image.avatar(),
    registeredAt: faker.date.past(),
  },
];

module.exports = data;
