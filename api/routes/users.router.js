const express = require('express');
const possport = require('passport');
const UsersService = require('./../services/users.service');
const validationHandler = require('../middlewares/validation.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require('./../schemas/user.schema');

const router = express.Router();
const service = new UsersService();

router.post(
  '/',
  possport.authenticate('jwt', { session: false }),
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
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
      const users = await service.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getUserSchema, 'params'),
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
  validationHandler(getUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await service.delete(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
