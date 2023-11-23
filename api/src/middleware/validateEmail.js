const { check } = require("express-validator");
const { emailValidate } = require("../helpers/validateHelper");


const validateCheckEmail = [
        check("email") 
        .exists()
        .isEmail(),
    (req, res, next) => {
        emailValidate(req, res, next);       
    }
];



module.exports = {
    validateCheckEmail 
}
