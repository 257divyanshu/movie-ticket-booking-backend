const { errorResponseBody } = require('../utils/responsebody');

const validateTheatreCreateRequest = async (req, res, next) => {
    // validate the presence of name
    if(!req.body.name) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The name of the theatre is not present in the request";
        return res.status(400).json(badRequestResponse)
    }
    // validate presence of pincode
    if(!req.body.pincode) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The pincode of the theatre is not present in the request";
        return res.status(400).json(badRequestResponse);
    }
    // validate the presence of city
    if(!req.body.city) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The city of the theatre is not present";
        return res.status(400).json(badRequestResponse);
    }
    next(); // everything is fine move to the next middleware
}

module.exports = {
    validateTheatreCreateRequest
}