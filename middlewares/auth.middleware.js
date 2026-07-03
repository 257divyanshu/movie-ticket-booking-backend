const jwt = require('jsonwebtoken');
const { errorResponseBody } = require('../utils/responsebody');
const userService = require('../services/user.service');
const { USER_ROLE, STATUS_CODES} = require('../utils/constants');

const validateSignupRequest = async (req, res, next) => {
    // validate the presence of name
    if (!req.body.name) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Name of the user is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of email
    if (!req.body.email) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Email of the user is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of password
    if (!req.body.password) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Password of the user is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
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
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of password
    if (!req.body.password) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No password provided for sign in";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // request is valid
    next();
}

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("isAuthenticated middleware");

        const token = req.headers["x-access-token"];
        if (!token) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "No token provided";
            return res.status(STATUS_CODES.UNAUTHORISED).json(badRequestResponse);
        }

        const response = jwt.verify(token, process.env.AUTH_KEY);
        if (!response) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "Token not verified";
            return res.status(STATUS_CODES.UNAUTHORISED).json(badRequestResponse);
        }

        // the token is verified

        // check if the user is still valid or not (there might be a case where the token is verified but the user corresponding to it no longer exists)
        const user = await userService.getUserById(response.id);
        req.userId = user._id;
        next();
    } catch (error) {
        if (error.name == "JsonWebTokenError") {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = error.message;
            return res.status(STATUS_CODES.UNAUTHORISED).json(badRequestResponse);
        }

        if (error.code == STATUS_CODES.NOT_FOUND) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "User doesn't exist"
            return res.status(error.code).json(badRequestResponse);
        }

        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(badRequestResponse);
    }
}

const validateResetPasswordRequest = (req, res, next) => {
    // validate the presence of old password
    if (!req.body.oldPassword) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = 'Old password is missing in the request';
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of new password
    if (!req.body.newPassword) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = 'New password is missing in the request';
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // we can proceed
    next();
}

const isAdmin = async (req, res, next) => {
    console.log("isAdmin middleware")

    const user = await userService.getUserById(req.userId);
    if (user.userRole != USER_ROLE.admin) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "User is not an admin, cannot proceed with the request";
        return res.status(STATUS_CODES.UNAUTHORISED).json(badRequestResponse);
    }
    next();
}

const isClient = async (req, res, next) => {
    console.log("isClient middleware")

    const user = await userService.getUserById(req.userId);
    if (user.userRole != USER_ROLE.client) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "User is not a client, cannot proceed with the request";
        return res.status(STATUS_CODES.UNAUTHORISED).json(badRequestResponse);
    }
    next();
}

const isAdminOrClient = async (req, res, next) => {
    console.log("isAdminOrClient middleware")

    const user = await userService.getUserById(req.userId);
    if (user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "User is neither a client nor an admin, cannot proceed with the request";
        return res.status(STATUS_CODES.UNAUTHORISED).json(badRequestResponse);
    }
    next();
}

module.exports = {
    validateSignupRequest,
    validateSigninRequest,
    isAuthenticated,
    validateResetPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient
}