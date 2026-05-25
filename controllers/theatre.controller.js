const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const createTheatre = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
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

module.exports = {
    createTheatre
}