const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const createTheatre = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);

        if (response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err = response.err;
            errorResponse.message = "Validation failed on few parameters of the request body"
            return res.status(response.code).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully created the theatre";
        return res.status(201).json(successResponse);
    } catch (error) {
        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;
        return res.status(500).json(errorResponse);
    }
}

const deleteTheatre = async (req, res) => {
    try {
        const response = await theatreService.deleteTheatre(req.params.id);
        if(response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = response.err;
            return res.status(response.code).json(errorResponse);
        }
        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully deleted the given theatre";
        return res.status(200).json(successResponse);
    } catch (error) {
        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;
        return res.status(500).json(errorResponse);
    }
}

module.exports = {
    createTheatre,
    deleteTheatre
}