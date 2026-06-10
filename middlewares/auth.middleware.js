const { errorResponseBody } = require('../utils/responsebody');

const validateSignupRequest = async (req, res, next) => {
    // validate the presence of name
    if(!req.body.name) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err = "Name of the user is not present in the request";
        return res.status(400).json(badRequestResponse);
    }
    // validate the presence of email
    if(!req.body.email) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err = "Email of the user is not present in the request";
        return res.status(400).json(badRequestResponse);
    }
    // validate the presence of password
    if(!req.body.password) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err = "Password of the user is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // request is valid
    next();
}

module.exports = {
    validateSignupRequest
}