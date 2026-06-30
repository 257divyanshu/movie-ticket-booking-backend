const Movie = require('../models/movie.model');
const movieService = require('../services/movie.service');
const { successResponseBody, errorResponseBody } = require('../utils/responsebody');

/**
 * Controller function to create a new movie
 * @returns movie created
 */
const createMovie = async (req, res) => {
    try {
        console.log('createMovie controller function');

        const response = await movieService.createMovie(req.body);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully created the movie";

        return res.status(201).json(successResponse);
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

        return res.status(500).json(errorResponse);
    }
};

const deleteMovie = async (req, res) => {
    try {
        console.log('deleteMovie controller function');
        console.log("req.params.id = ", req.params.movieId);

        const response = await movieService.deleteMovie(req.params.movieId);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully deleted the movie";

        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);

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

const getMovie = async (req, res) => {
    try {
        console.log('getMovie controller function');
        console.log("req.params.id = ", req.params.movieId);

        const response = await movieService.getMoviById(req.params.movieId);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the movie";

        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);

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

const replaceMovie = async (req, res) => {
    try {
        console.log('replaceMovie controller function');
        console.log("req.params.id = ", req.params.movieId);

        const response = await movieService.replaceMovie(req.params.movieId, req.body);

        const successResponse = successResponseBody();
        successResponse.data = response;

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

const updateMovie = async (req, res) => {
    try {
        console.log('updateMovie controller function');
        console.log("req.params.id = ", req.params.movieId);

        const response = await movieService.updateMovie(req.params.movieId, req.body);

        const successResponse = successResponseBody();
        successResponse.data = response;

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

const getMovies = async (req, res) => {
    try {
        console.log('getMovies controller function');

        const response = await movieService.fetchMovies(req.query);

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the movies";

        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);

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
    createMovie,
    deleteMovie,
    getMovie,
    replaceMovie,
    updateMovie,
    getMovies
}