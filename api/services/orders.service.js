const boom = require('@hapi/boom')

const { models } = require('./../libs/sequelize')

class OrdersService {
  constructor () {}

  async create (data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    if (!customer) {
      throw boom.badRequest('Customer not found')
    }
    const newOrder = await models.Order.create({ customerId: customer.id })
    return newOrder
  }

  async addItem (orderId, data) {
    const newData = { orderId, ...data }
    const newItem = await models.OrderProduct.create(newData)
    return newItem
  }

  async find () {
    const orders = await models.Order.findAll()
    return orders
  }

  async findOne (id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    })
    return order
  }

  async findByUser (userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    })
    return orders
  }
}

module.exports = OrdersService
