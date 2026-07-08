const showService = require('../services/show.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const { STATUS_CODES } = require('../utils/constants');

const createShow = async (req, res) => {
    try {
        console.log("createShow controller function");

        const response = await showService.createShow(req.body);

        const successResponse = successResponseBody();
        successResponse.message = "Successfully created the show";
        successResponse.data = response;

        return res.status(STATUS_CODES.CREATED).json(successResponse);
    } catch (error) {
        console.log("controller layer error");
        console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();

            if (error.code === STATUS_CODES.NOT_FOUND) {
                errorResponse.err.message = error.err;
            }

            if (error.code === STATUS_CODES.UNPROCESSABLE_ENTITY) {
                errorResponse.err = error.err;
                errorResponse.message = "Validation failed for the supplied show details";
            }

            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

const getShows = async (req, res) => {
    try {
        console.log("getShows controller function");

        const response = await showService.getShows(req.query);

        const successResponse = successResponseBody();
        successResponse.message = "Successfully fetched the movie shows";
        successResponse.data = response;

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log("controller layer error");
        console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = error.err;
            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

module.exports = {
    createShow,
    getShows
}