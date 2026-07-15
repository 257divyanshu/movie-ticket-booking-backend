const { STATUS_CODES, USER_ROLE, BOOKING_STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const userService = require('../services/user.service');
const showService = require('../services/show.service');
const bookingService = require('../services/booking.service');

const validateBookingCreateRequest = async (req, res, next) => {
    console.log("validateBookingCreateRequest middleware function");

    try {

        // validate the presence of showId
        if (!req.body.showId) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "showId is not provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
        }

        // validate showId
        if (!ObjectId.isValid(req.body.showId)) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "Invalid showId provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
        }

        // verify show exists
        const show = await showService.getShowById(req.body.showId);
        req.show = show;

        // validate the presence of noOfSeats
        if (req.body.noOfSeats === undefined || req.body.noOfSeats === null) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "noOfSeats is not provided";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
        }

        // validate noOfSeats
        if (req.body.noOfSeats <= 0) {
            const badRequestResponse = errorResponseBody();
            badRequestResponse.message = "Malformed Request | Bad Request";
            badRequestResponse.err.message = "noOfSeats should be greater than 0";
            return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
        }

        next();

    } catch (error) {
        console.log("middleware layer error");
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

const validateBookingUpdateRequest = async (req, res, next) => {
    console.log("validateBookingUpdateRequest middleware function");

    try {
        const user = await userService.getUserById(req.userId);

        // Fetch the booking being updated.
        const booking = await bookingService.getBookingById(req.params.bookingId);

        // show and user fields are immutable.
        if (req.body.show || req.body.user) {
            throw {
                err: "show and user cannot be updated",
                code: STATUS_CODES.BAD_REQUEST
            };
        }

        if (user.userRole === USER_ROLE.customer) {

            // Customers can only update their own bookings.
            if (booking.user.toString() !== req.userId.toString()) {
                throw {
                    err: "You are not authorized to update another user's booking",
                    code: STATUS_CODES.FORBIDDEN
                };
            }

            // Customers cannot modify noOfSeats or totalCost.
            if (req.body.noOfSeats || req.body.totalCost) {
                throw {
                    err: "Customers are only allowed to update the booking status",
                    code: STATUS_CODES.FORBIDDEN
                };
            }

            // Customers can only change the status to CANCELLED.
            if (
                req.body.status &&
                req.body.status !== BOOKING_STATUS.cancelled
            ) {
                throw {
                    err: "You are only allowed to cancel your booking",
                    code: STATUS_CODES.FORBIDDEN
                };
            }
        }

        next();
    } catch (error) {
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
    validateBookingCreateRequest,
    validateBookingUpdateRequest
}