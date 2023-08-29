const { ValidationError } = require('sequelize')

function errorLogger (error, req, res, next) {
  console.error(error)
  next(error)
}

function errorHandler (error, req, res, next) {
  res.status(500).json({ message: error.message, stack: error.stack })
}

function boomErrorHandler (error, req, res, next) {
  if (error.isBoom) {
    const { output } = error
    res.status(output.statusCode).json(output.payload)
  } else {
    next(error)
  }
}

function ormErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  next(err)
}

module.exports = {
  errorLogger,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
}
