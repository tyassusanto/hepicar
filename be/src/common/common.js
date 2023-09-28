const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const response = (res, result, status, message, pagination) => {
    res.status(status).json({
      status: 'Success',
      code: status || 200,
      data: result,
      message: message || null,
      pagination: pagination
    });
  };

const auth = (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        // console.log(token);
    } else {
        return next(createError(403, 'Need Token'))
    }
    try {
        const secretKey = process.env.SECRET_JWT;
        const decoded = jwt.verify(token, secretKey);
        req.email = decoded.email
      } catch(err) {
        return next(createError(403, 'Invalid Token'))
      }
      next()
}


  module.exports = { 
    response,
    auth,
 }