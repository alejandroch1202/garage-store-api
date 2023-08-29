const express = require('express')
const possport = require('passport')
const CategoriesService = require('./../services/categories.service')
const validationHandler = require('./../middlewares/validation.handler')
const { checkRoles } = require('./../middlewares/auth.handler')
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema
} = require('./../schemas/category.schema')

const router = express.Router()
const service = new CategoriesService()

router.post(
  '/',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await service.create(body)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
    try {
      const categories = await service.find()
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await service.findOne(id)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const category = await service.update(id, body)
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await service.delete(id)
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
