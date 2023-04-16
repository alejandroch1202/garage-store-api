const express = require('express');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;
