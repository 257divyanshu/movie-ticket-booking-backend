const paymentService = require('../services/payment.service');
const { BOOKING_STATUS, STATUS_CODES } = require('../utils/constants');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');

const createPayment = async (req, res) => {
    try {
        console.log("createPayment controller function");

        const response = await paymentService.createPayment({ ...req.body, userId: req.userId });

        if (response.status === BOOKING_STATUS.expired) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = "The payment took more than 5 minutes to get processed, hence you booking got expired, please try again";

            return res.status(STATUS_CODES.GONE).json(errorResponse);
        }

        if (response.status === BOOKING_STATUS.cancelled) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = "The payment failed due to some reason. Booking was not successfull. Please try again";

            return res.status(STATUS_CODES.PAYMENT_REQUIRED).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Booking completed successfully";

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

const getPaymentDetailsById = async (req, res) => {
    try {
        console.log("getPaymentDetailsById controller function");

        const response = await paymentService.getPaymentById(req.params.paymentId, req.userId);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the booking and payment details";

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
    createPayment,
    getPaymentDetailsById
}