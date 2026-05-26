const theatreService = require('../services/theatre.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const createTheatre = async (req, res) => {
    try {
        console.log('createTheatre controller function');
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
        console.log(error);
        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;
        return res.status(500).json(errorResponse);
    }
}

const deleteTheatre = async (req, res) => {
    try {
        console.log('deleteTheatre controller function');
        console.log("req.params.id = ", req.params.movieId);
        const response = await theatreService.deleteTheatre(req.params.theatreId);
        
        if (response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = response.err;
            return res.status(response.code).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully deleted the given theatre";
        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;
        return res.status(500).json(errorResponse);
    }
}

const getTheatre = async (req, res) => {
    try {
        console.log('getTheatre controller function');
        console.log("req.params.id = ", req.params.movieId);
        const response = await theatreService.getTheatre(req.params.theatreId);
        
        if (response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = response.err;
            return res.status(response.code).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the theatre data";
        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;
        return res.status(500).json(errorResponse);
    }
}

const getTheatres = async (req, res) => {
    try {
        console.log('getTheatres controller function');
        const response = await theatreService.getTheatres();
        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched all the theatres";
        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = errorResponseBody();
        errorResponse.err = error;
        return res.status(500).json(errorResponse);
    }
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getTheatres
}