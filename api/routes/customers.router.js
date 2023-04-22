const express = require('express');
const possport = require('passport');
const CustomerService = require('./../services/customers.service');
const validationHandler = require('./../middlewares/validation.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('./../schemas/customer.schema');

const router = express.Router();
const service = new CustomerService();

router.post(
  '/',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
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
      res.json(await service.find());
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
