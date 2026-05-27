const { errorResponseBody } = require("../utils/responsebody");

/**
 * Validates the movie creation request payload for required fields. 
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next middlware function
 * @returns {Object|void} Returns a 400 response for invalid requests, otherwise passes control to next middleware
 */
const validateMovieCreateRequest = async (req, res, next) => {
    // validate the movie name
    if (!req.body.name) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The name of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate the movie description
    if (!req.body.description) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The description of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate the movie casts
    if (!req.body.casts ||
        !(req.body.casts instanceof Array) ||
        req.body.casts.length <= 0
    ) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The casts of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate the movie trailer url
    if (!req.body.trailerUrl) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The trailerUrl of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate the release date of the movie
    if (!req.body.releaseDate) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The releaseDate of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }

    // validate director of the movie
    if (!req.body.director) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "The director of the movie is not present in the request";
        return res.status(400).json(badRequestResponse);
    }
    next();
}

module.exports = {
    validateMovieCreateRequest
}