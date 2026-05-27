const { errorResponseBody } = require('../utils/responsebody');

/**
 * Validates the theatre creation request payload for required fields. 
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next middlware function
 * @returns {Object|void} Returns a 400 response for invalid requests, otherwise passes control to next middleware
 */
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