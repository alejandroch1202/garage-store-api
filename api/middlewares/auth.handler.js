const boom = require('@hapi/boom')
const { config } = require('./../config')

function checkApiKey (req, res, next) {
  const apiKey = req.headers['gs-api-key']
  if (apiKey === config.apiKey) {
    next()
  } else {
    next(boom.unauthorized())
  }
}

function checkRoles (...roles) {
  return (req, res, next) => {
    console.log(req.user)
    const user = req.user
    if (roles.includes(user.role)) {
      next()
    } else {
      next(boom.unauthorized())
    }
  }
}

module.exports = { checkApiKey, checkRoles }
