const { faker } = require('@faker-js/faker');

const data = [];
const limit = 5;

for (let i = 0; i < limit; i++) {
  data.push({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    image: faker.image.imageUrl(),
  });
}

module.exports = data;
