const express = require('express');
const possport = require('passport');
const OrdersService = require('./../services/orders.service');
const validationHandler = require('./../middlewares/validation.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrdersService();

router.post(
  '/',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  async (req, res, next) => {
    try {
      const orders = await service.find();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:id/products',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getOrderSchema, 'params'),
  validationHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const newItem = await service.addItem(id, body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
