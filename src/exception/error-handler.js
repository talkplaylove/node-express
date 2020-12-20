const CustomError = require('./custom-error')

module.exports = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.code).json({
      message: err.message
    })
  }
  console.log(err)
  return res.status(500).json(err)
}