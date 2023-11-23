// const throwError = require("../helpers/customError");
// const { isString, isNumber } = require("../helpers/regexValidation");

//! ESTO NO SE VA USAR, SOLO DE EJ.

const middleware = {};

middleware.validationSearchGet = (req, res, next) => {
    try {

        const { tag_name, price_value, price_comparison, current_page, per_page } = req.query;

        const type_of_price_comparison = ["<", ">", "=", ""];

        if (
            isString(tag_name)
            && isNumber(price_value)
            && isNumber(current_page)
            && isNumber(per_page)
            && type_of_price_comparison.includes(price_comparison)
        )
            next();
        else
            return throwError("data_invalid", 400, "You data is invalid.");

    } catch (error) {
        res.status(error.status || 404).json(error.payload || error.massage);
    }
};

module.exports = middleware;
