const boom = require('@hapi/boom')

function validationHandler (schema, properties) {
  return (req, res, next) => {
    const data = req[properties]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validationHandler
