const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const bookingService = require('../services/booking.service');
const { STATUS_CODES } = require('../utils/constants');

const createBooking = async (req, res) => {
    try {
        console.log("createBooking controller layer function");

        let userId = req.userId;

        const response = await bookingService.createBooking({ ...req.body, userId: userId });

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully created the booking";

        return res.status(STATUS_CODES.CREATED).json(successResponse);
    } catch (error) {
        console.log("controller layer error");
        // console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err = error.err;
            errorResponse.message = "Validation failed on few parameters of the request body";
            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

const updateBooking = async (req, res) => {
    try {
        console.log("updateBooking controller layer function");

        const response = await bookingService.updateBooking(req.body, req.params.bookingId);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully updated the booking";

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log("controller layer error");
        // console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();
            if (error.code === STATUS_CODES.NOT_FOUND) {
                errorResponse.err.message = error.err;
            }
            else if (error.code === STATUS_CODES.UNPROCESSABLE_ENTITY) {
                errorResponse.err = error.err;
                errorResponse.message = "The updates that you are trying to apply doesn't validate the schema";
            }
            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}


module.exports = {
    createBooking,
    updateBooking
}