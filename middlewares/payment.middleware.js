const { STATUS_CODES } = require("../utils/constants");
const { errorResponseBody } = require("../utils/responsebody")
const ObjectId = require('mongoose').Types.ObjectId;

const verifyPaymentCreateRequest = async (req, res, next) => {
    console.log("verifyPaymentCreateRequest middleware function");

    // validate the presence of bookingId
    if (!req.body.bookingId) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No bookingId received";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    // check if bookingId is valid or not
    if (!ObjectId.isValid(req.body.bookingId)) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Invalid bookingId";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    // validate the presence of amount
    if (req.body.amount === undefined || req.body.amount === null) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "No amount sent";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    // check if amount supplied is valid or not
    if ((typeof req.body.amount !== 'number') || (req.body.amount <= 0)) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Invalid amount sent";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse)
    }

    next();

}

module.exports = {
    verifyPaymentCreateRequest
}