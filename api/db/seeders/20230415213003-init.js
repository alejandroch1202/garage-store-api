'use strict';
const { faker } = require('@faker-js/faker');
const { USER_TABLE } = require('./../models/user.model');
const { CUSTOMER_TABLE } = require('./../models/customer.model');
const { CATEGORY_TABLE } = require('./../models/category.model');
const { PRODUCT_TABLE } = require('./../models/product.model');
const { ORDER_TABLE } = require('./../models/order.model');

module.exports = {
  up: async (queryInterface) => {
    // Seeding users table
    const users = [];
    const usersLimit = 4;
    for (let i = 0; i < usersLimit; i++) {
      users.push({
        email: faker.internet.email().toLocaleLowerCase(),
        password: faker.internet.password(),
        role: 'customer',
        created_at: faker.date.past(),
        recovery_token: null,
      });
    }
    await queryInterface.bulkInsert(USER_TABLE, users);

    // Seeding customers table
    const customers = [];
    const customersLimit = 2;
    for (let i = 0; i < customersLimit; i++) {
      customers.push({
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone: faker.phone.number(),
        created_at: faker.date.past(),
        user_id: faker.datatype.number({ min: 1, max: 4 }),
      });
    }
    await queryInterface.bulkInsert(CUSTOMER_TABLE, customers);

    // Seeding categories table
    const categories = [];
    const categoriesLimit = 5;
    for (let i = 0; i < categoriesLimit; i++) {
      categories.push({
        name: faker.commerce.department(),
        image: faker.image.imageUrl(640, 480, 'nature', true),
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
        image: faker.image.imageUrl(640, 480, 'nature', true),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        created_at: faker.date.past(),
        category_id: faker.datatype.number({ min: 1, max: 5 }),
      });
    }
    await queryInterface.bulkInsert(PRODUCT_TABLE, products);

    // Seeding orders table
    const orders = [];
    const ordersLimit = 4;
    for (let i = 0; i < ordersLimit; i++) {
      orders.push({
        customer_id: faker.datatype.number({ min: 1, max: 2 }),
        created_at: faker.date.past(),
      });
    }
    await queryInterface.bulkInsert(ORDER_TABLE, orders);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete(ORDER_TABLE, null, {});
    await queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
    await queryInterface.bulkDelete(CATEGORY_TABLE, null, {});
    await queryInterface.bulkDelete(CUSTOMER_TABLE, null, {});
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  },
};
