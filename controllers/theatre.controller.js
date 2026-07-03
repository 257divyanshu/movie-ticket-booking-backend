const theatreService = require('../services/theatre.service');
const { STATUS_CODES } = require('../utils/constants');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

const createTheatre = async (req, res) => {
    try {
        console.log('createTheatre controller function');

        const response = await theatreService.createTheatre(req.body);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully created the theatre";

        return res.status(STATUS_CODES.CREATED).json(successResponse);
    } catch (error) {
        console.log(error);

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

const deleteTheatre = async (req, res) => {
    try {
        console.log('deleteTheatre controller function');
        console.log("req.params.id = ", req.params.movieId);

        const response = await theatreService.deleteTheatre(req.params.theatreId);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully deleted the given theatre";

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log(error);

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

const getTheatre = async (req, res) => {
    try {
        console.log('getTheatre controller function');
        console.log("req.params.id = ", req.params.movieId);

        const response = await theatreService.getTheatre(req.params.theatreId);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the theatre data";

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log(error);

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

const getTheatres = async (req, res) => {
    try {
        console.log('getTheatres controller function');

        const response = await theatreService.getTheatres(req.query);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched all the theatres";

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
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

const replaceTheatre = async (req, res) => {
    try {
        console.log('replaceTheatre controller function');
        console.log("req.params.id = ", req.params.theatreId);

        const response = await theatreService.replaceTheatre(req.params.theatreId, req.body);

        const successResponse = successResponseBody();
        successResponse.data = response;

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();

            if (error.code === STATUS_CODES.NOT_FOUND) {
                errorResponse.err.message = error.err;
            }
            else if (error.code === STATUS_CODES.UNPROCESSABLE_ENTITY) {
                errorResponse.err = error.err;
                errorResponse.message = "The updates that you are trying to apply doesn't validate the schema";
            }

            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

const updateTheatre = async (req, res) => {
    try {
        console.log('updateTheatre controller function');
        console.log("req.params.id = ", req.params.theatreId);

        const response = await theatreService.updateTheatre(req.params.theatreId, req.body);

        const successResponse = successResponseBody();
        successResponse.data = response;

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();

            if (error.code === STATUS_CODES.NOT_FOUND) {
                errorResponse.err.message = error.err;
            }
            else if (error.code === STATUS_CODES.UNPROCESSABLE_ENTITY) {
                errorResponse.err = error.err;
                errorResponse.message = "The updates that you are trying to apply doesn't validate the schema";
            }

            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

const updateMovies = async (req, res) => {
    try {
        console.log('updateMovies controller function');

        const response = await theatreService.updateMoviesInTheatres(
            req.params.theatreId,
            req.body.movieIds,
            req.body.insert
        );

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully updated movies in the theatre";

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
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

const getMovies = async (req, res) => {
    try {
        console.log('getMovies controller function');

        const response = await theatreService.getMoviesInATheatre(req.params.theatreId);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the movies for the theatre";

        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err = error.err;
            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}


const checkMovie = async (req, res) => {
    try {
        console.log('checkMovie controller function');

        const response = await theatreService.checkMovieInATheatre(req.params.theatreId, req.params.movieId);
 
        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully checked if movie is present in the theatre";
        
        return res.status(STATUS_CODES.OK).json(successResponse);
    } catch (error) {
        console.log(error);

        if (error.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err = error.err;
            return res.status(error.code).json(errorResponse);
        }

        const errorResponse = errorResponseBody();
        errorResponse.err = error;

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getTheatres,
    replaceTheatre,
    updateTheatre,
    updateMovies,
    getMovies,
    checkMovie
}