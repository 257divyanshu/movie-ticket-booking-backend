const { STATUS_CODES } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const validateCreateShowRequest = async (req, res, next) => {
    console.log("validateCreateShowRequest middleware function");

    // validate the presence of theatre id
    if (!req.body.theatreId) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No theatreId provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // check if theatreId is valid or not
    if (!ObjectId.isValid(req.body.theatreId)) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Invalid theatreId";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of movieId
    if (!req.body.movieId) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No movieId provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // check if movieId is valid or not
    if (!ObjectId.isValid(req.body.movieId)) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Invalid movieId";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of timing
    if (!req.body.timing) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No timing provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of noOfSeats
    if (!req.body.noOfSeats) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No seat information provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of price
    if (!req.body.price) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No price information provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    next();
}

const validateShowUpdateRequest = async (req, res, next) => {
    console.log("validateShowUpdateRequest middleware function");

    if (req.body.theatreId || req.body.movieId) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "We cannot update theatre or movie for an already added show";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    next();
}

module.exports = {
    validateCreateShowRequest,
    validateShowUpdateRequest
}