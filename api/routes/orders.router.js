const express = require('express');
const OrdersService = require('./../services/orders.service');
const validationHandler = require('./../middlewares/validation.handler');
const {
  createOrderSchema,
  getOrderSchema,
} = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrdersService();

router.post(
  '/',
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

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
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

module.exports = router;
