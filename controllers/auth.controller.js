const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const signup = async (req, res) => {
    try {
        const response = await userService.createUser(req.body);
        if (response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err = response.err;
            errorResponse.message = "Validation failed on few parameters of the request body"
            return res.status(response.code).json(errorResponse);
        }
        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully registered a user";
        return res.status(201).json(successResponse);
    } catch (error) {
        const errorResponse = errorResponseBody();
        errorResponse.err = error;
        return res.status(500).json(errorResponse);
    }
}

module.exports = {
    signup
}