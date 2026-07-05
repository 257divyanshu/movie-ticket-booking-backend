const { STATUS_CODES } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const theatreService = require('../services/theatre.service');

const validateBookingCreateRequest = async (req, res, next) => {
    console.log("validateBookingCreateRequest middleware function");

    try {

        // validate the presence of theatreId
        if (!req.body.theatreId) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "theatreId is not provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
        }

        // check if theatreId is valid
        if (!ObjectId.isValid(req.body.theatreId)) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "Invalid theatreId provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
        }

        // check if theatre exists
        const theatre = await theatreService.getTheatre(req.body.theatreId);

        // validate the presence of movieId
        if (!req.body.movieId) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "movieId is not provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
        }

        // check if movieId is valid
        if (!ObjectId.isValid(req.body.movieId)) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "Invalid movieId provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
        }

        // check if the movie is available in the theatre or not?
        if (theatre.movies.indexOf(req.body.movieId) == -1) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "Given movie is not available in the requested theatre";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
        }

        // validate the presence of timing
        if (!req.body.timing) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "movie timing is not provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
        }

        // validate the presence of noOfSeats
        if (!req.body.noOfSeats) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "noOfSeats is not provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
        }

        // everything is fine with the request body
        next();

    }
    catch (error) {
        console.log("middleware layer error");
        console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = error.err;
            return res.status(error.code).json(errorResponse);
        }


        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err = error;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(badRequestResponse);
    }

}

module.exports = {
    validateBookingCreateRequest
}