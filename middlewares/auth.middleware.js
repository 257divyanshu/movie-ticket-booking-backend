const { errorResponseBody } = require('../utils/responsebody');

const validateSignupRequest = async (req, res, next) => {
    // validate the presence of name
    if (!req.body.name) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Name of the user is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate the presence of email
    if (!req.body.email) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Email of the user is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate the presence of password
    if (!req.body.password) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Password of the user is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // request is valid
    next();
}

/**
 * validator for user signin
 * @param req -> http request object
 * @param res -> http response object
 * @param next -> next middleware
 */
const validateSigninRequest = async (req, res, next) => {
    // validate the presence of email
    if (!req.body.email) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No email provided for sign in";
        return res.status(400).json(badRequestResponse);
    }

    // validate the presence of password
    if (!req.body.password) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No password provided for sign in";
        return res.status(400).json(badRequestResponse);
    }

    // request is valid
    next();
}

module.exports = {
    validateSignupRequest,
    validateSigninRequest
}