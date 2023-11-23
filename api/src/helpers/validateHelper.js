const { validationResult  } = require("express-validator")


const emailValidate = (req, res, next) => {
try {
   validationResult(req)
    return next()
} catch (error) {
    res.status(403).send({errors: error.array()})
}
}

module.exports = {
    emailValidate
}