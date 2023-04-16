'use strict';
const { faker } = require('@faker-js/faker');
const { USER_TABLE } = require('./../models/user.model');
const { CATEGORY_TABLE } = require('./../models/category.model');
const { PRODUCT_TABLE } = require('./../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    // Seeding users table
    const users = [];
    const usersLimit = 10;
    for (let i = 0; i < usersLimit; i++) {
      users.push({
        email: faker.internet.email().toLocaleLowerCase(),
        password: faker.internet.password(),
        recovery_token: null,
        role: 'customer',
        created_at: faker.date.past(),
      });
    }
    await queryInterface.bulkInsert(USER_TABLE, users);

    // Seeding categories table
    const categories = [];
    const categoriesLimit = 6;
    for (let i = 0; i < categoriesLimit; i++) {
      categories.push({
        name: faker.commerce.department(),
        image: faker.image.imageUrl(),
        created_at: faker.date.past(),
      });
    }
    await queryInterface.bulkInsert(CATEGORY_TABLE, categories);

    // Seeding products table
    const products = [];
    const productsLimit = 20;
    for (let i = 0; i < productsLimit; i++) {
      products.push({
        name: faker.commerce.productName(),
        image: faker.image.imageUrl(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        created_at: faker.date.past(),
        category_id: faker.datatype.number({ min: 1, max: 6 }),
      });
    }
    await queryInterface.bulkInsert(PRODUCT_TABLE, products);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(USER_TABLE, null, {});
    await queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
    await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  },
};
