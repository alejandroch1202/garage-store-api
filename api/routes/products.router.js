const express = require('express')
const possport = require('passport')
const ProductsService = require('./../services/products.service')
const validationHandler = require('./../middlewares/validation.handler')
const { checkRoles } = require('./../middlewares/auth.handler')
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('./../schemas/product.schema')

const router = express.Router()
const service = new ProductsService()

router.post(
  '/',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.create(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/',
  validationHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query)
      res.json(products)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  possport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validationHandler(getProductSchema, 'params'),
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
