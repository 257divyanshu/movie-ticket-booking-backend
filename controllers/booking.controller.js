const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const bookingService = require('../services/booking.service');
const { STATUS_CODES } = require('../utils/constants');

const createBooking = async (req, res) => {
    try {
        console.log("createBooking controller layer function");

        const response = await bookingService.createBooking({ ...req.body, user: req.userId, show: req.show });

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully created the booking";

        return res.status(STATUS_CODES.CREATED).json(successResponse);
    } catch (error) {
        console.log("controller layer error");
        console.log(error);

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
        console.log(error);

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

const getBookings = async (req, res) => {
    try {
        console.log("getBookings controller function");

        const response = await bookingService.getBookings({ user: req.userId });

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the bookings";

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log("controller layer error");
        // console.log(error);

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

const getAllBookings = async (req, res) => {
    try {
        console.log("getAllBookings controller function");

        const response = await bookingService.getAllBookings();

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched all the bookings";

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log("controller layer error");
        // console.log(error);

        const errorResponse = errorResponseBody();
        errorResponse.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

const getBookingById = async (req, res) => {
    try {
        console.log("getBookingById controller function");

        const response = await bookingService.getBookingById(req.params.bookingId);

        const user = await userService.getUserById(req.userId);

        // Customers can only access their own bookings.
        if (
            user.userRole === USER_ROLE.customer &&
            response.user._id.toString() !== req.userId.toString()
        ) {
            throw {
                err: "You are not authorized to access another user's booking",
                code: STATUS_CODES.FORBIDDEN
            };
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the booking";

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
    createBooking,
    updateBooking,
    getBookings,
    getAllBookings,
    getBookingById
}