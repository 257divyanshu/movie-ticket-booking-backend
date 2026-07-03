const { errorResponseBody } = require("../utils/responsebody")
const {STATUS_CODES} = require("../utils/constants");

const validateUpdateUserRequest = (req, res, next) => {
    // validate presence of atleast one of the two i.e. userRole or userStatus
    if (!(req.body.userRole || req.body.userStatus)) {
        const badRequestResponse = errorResponseBody();
        badRequestResponse.message = "Malformed Request | Bad Request";
        badRequestResponse.err.message = "Neither userRole nor userStatus is provided in the request body";
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponse);
    }

    next();
}

module.exports = {
    validateUpdateUserRequest
}