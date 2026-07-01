const jwt = require('jsonwebtoken');
const { errorResponseBody } = require('../utils/responsebody');
const userService = require('../services/user.service');

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

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "No token provided";
            return res.status(403).json(badRequestResponse);
        }

        const response = jwt.verify(token, process.env.AUTH_KEY);
        if (!response) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "Token not verified";
            return res.status(401).json(badRequestResponse);
        }

        // the token is verified
        
        // check if the user is still valid or not (there might be a case where the token is verified but the user corresponding to it no longer exists)
        const user = await userService.getUserById(response.id);
        req.userId = user.id;
        next();
    } catch (error) {
        if (error.name == "JsonWebTokenError") {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = error.message;
            return res.status(401).json(badRequestResponse);
        }

        if (error.code == 404) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "User doesn't exist"
            return res.status(error.code).json(badRequestResponse);
        }

        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err = error;
        return res.status(500).json(badRequestResponse);
    }
}

module.exports = {
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated
}