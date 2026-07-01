const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const signup = async (req, res) => {
    try {
        console.log('signup controller function');

        const response = await userService.createUser(req.body);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully registered a user";

        return res.status(201).json(successResponse);
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

        return res.status(500).json(errorResponse);
    }
}

const signin = async (req, res) => {
    try {
        console.log('signin controller function');

        const user = await userService.getUserByEmail(req.body.email);
        // console.log(user)

        const isValidPassword = await user.isValidPassword(req.body.password);

        if (!isValidPassword) {
            throw { err: 'Invalid password for the given email', code: 401 };
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

        return res.status(200).json(successResponse);
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

        return res.status(500).json(errorResponse);
    }
}

module.exports = {
    signup,
    signin
}