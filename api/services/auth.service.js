const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { config } = require('./../config')

const UserService = require('./users.service')
const service = new UserService()

class AuthService {
  async getUser (email, password) {
    const user = await service.findByEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw boom.unauthorized()
    }
    delete user.dataValues.password
    return user
  }

  signToken (user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret)
    return {
      user,
      token
    }
  }

  async sendRecovery (email) {
    const user = await service.findByEmail(email)
    if (!user) {
      throw boom.unauthorized()
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' })
    const link = `http://localhost:3000/recovery?token=${token}`
    await service.update(user.id, { recoveryToken: token })
    const mail = {
      from: config.emailAddress,
      to: `${user.email}`,
      subject: 'Reset password',
      html: `<p> Please click in the link below to reset your password <br> ${link} <p>`
    }
    const response = await this.sendMail(mail)
    return response
  }

  async changePassword (token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret)
      const user = await service.findOne(payload.sub)
      if (user.recoveryToken !== token) {
        throw boom.unauthorized()
      }
      const hash = await bcrypt.hash(newPassword, 10)
      await service.update(user.id, { recoveryToken: null, password: hash })
      return { message: 'Password sucessfully changed' }
    } catch (error) {
      throw boom.unauthorized()
    }
  }

  async sendMail (infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      secure: true,
      port: config.smtpPort,
      auth: {
        user: config.emailAddress,
        pass: config.emailPassword
      }
    })
    await transporter.sendMail(infoMail)
    return { message: 'Email sucessfully sent' }
  }
}

module.exports = AuthService
