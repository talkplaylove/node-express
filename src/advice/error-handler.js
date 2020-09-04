const CustomError = require('./custom-error')
const { logger } = require('../config/winston')

module.exports = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.code).json({
      message: err.message
    })
  }
  logger.error(err)
  return res.status(500).json(err)
}