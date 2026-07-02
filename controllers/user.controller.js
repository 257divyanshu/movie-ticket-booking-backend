const userService = require('../services/user.service');
const { errorResponseBody, successResponseBody } = require('../utils/responsebody');

const updateUser = async (req, res) => {
    try {
        console.log('updateUser controller function');

        const response = await userService.updateUserRoleOrStatus(req.body, req.params.id);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = 'Successfully updated the user';

        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();

            if (error.code === 404) {
                errorResponse.err.message = error.err;
            }
            else if (error.code === 422) {
                errorResponse.err = error.err;
                errorResponse.message = "The updates that you are trying to apply doesn't validate the schema";
            }

            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;

        return res.status(500).json(errorResponse);
    }
}

module.exports = {
    updateUser
}