const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');
const {STATUS_CODES} = require("../utils/constants");

const signup = async (req, res) => {
    try {
        console.log('signup controller function');

        const response = await userService.createUser(req.body);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully registered a user";

        return res.status(STATUS_CODES.CREATED).json(successResponse);
    } catch (error) {
        console.log("controller layer error");
        // console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err = error.err;
            errorResponse.message = "Validation failed on few parameters of the request body"
            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

const signin = async (req, res) => {
    try {
        console.log('signin controller function');

        const user = await userService.getUserByEmail(req.body.email);
        // console.log(user)

        const isValidPassword = await user.isValidPassword(req.body.password);

        if (!isValidPassword) {
            throw { err: 'Invalid password for the given email', code: STATUS_CODES.UNAUTHORISED };
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.AUTH_KEY,
            { expiresIn: '1h' }
        );

        const successResponse = successResponseBody();
        successResponse.message = "Successfully logged in";
        successResponse.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token: token
        };

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
        errorResponse.err.message = error.message;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

const resetPassword = async (req, res) => {
    try {
        console.log('resetPassword controller function');

        const user = await userService.getUserById(req.userId);

        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPassword);

        if (!isOldPasswordCorrect) {
            throw { err: 'Invalid old password, please write the correct old password', code: STATUS_CODES.BAD_REQUEST };
        }

        user.password = req.body.newPassword;
        await user.save();

        const successResponse = successResponseBody();
        successResponse.data = user;
        successResponse.message = 'Successfully updated the password for the given user';
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
        errorResponse.err.message = error.message;
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

module.exports = {
    signup,
    signin,
    resetPassword
}