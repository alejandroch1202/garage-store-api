const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { models } = require('../libs/sequelize')

class UsersService {
  constructor () {}

  async create (data) {
    const hash = await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({ ...data, password: hash })
    delete newUser.dataValues.password
    return newUser
  }

  async find () {
    const users = await models.User.findAll()
    return users
  }

  async findOne (id) {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async findByEmail (email) {
    const user = await models.User.findOne({
      where: { email }
    })
    return user
  }

  async update (id, changes) {
    const user = await this.findOne(id)
    const response = await user.update(changes)
    return response
  }

  async delete (id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { id }
  }
}

module.exports = UsersService
