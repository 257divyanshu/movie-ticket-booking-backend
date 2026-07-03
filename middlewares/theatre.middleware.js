const { errorResponseBody } = require('../utils/responsebody');
const {STATUS_CODES} = require("../utils/constants");

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
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    // validate presence of pincode
    if(!req.body.pincode) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The pincode of the theatre is not present in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of city
    if(!req.body.city) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The city of the theatre is not present";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    next(); // everything is fine move to the next middleware
}

const validateUpdateMoviesRequest = async (req, res, next) => {
    // validate the presence of insert parameter
    if(req.body.insert == undefined) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The insert parameter is missing in the request";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the presence of movieIds
    if(!req.body.movieIds) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No movies present in the request to be updated in theatre";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the type of movieIds
    if(!(req.body.movieIds instanceof Array)) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Expected array of movies but found something else";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    // validate the length of movieIds array
    if(req.body.movieIds.length == 0) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No movies present in the array provided";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }
    
    // everything is fine
    next();
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
}