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

        if (response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err = response.err;
            errorResponse.message = "Validation failed on few parameters of the request body"
            return res.status(response.code).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully created the movie";
        return res.status(201).json(successResponse);
    } catch (error) {
        console.log(error);
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

        if (response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = response.err;
            return res.status(response.code).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully deleted the movie";
        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
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

        if (response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = response.err;
            return res.status(response.code).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the movie";
        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
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

        if (response.err) {
            const errorResponse = errorResponseBody();
            if(response.code === 404){
                errorResponse.err.message = response.err;
            }
            else if (response.code === 422){
                errorResponse.err = response.err;
                errorResponse.message = "The updates that you are trying to apply doesn't validate the schema";
            }
                return res.status(response.code).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;
        return res.status(500).json(errorResponse);
    }
}

const getMovies = async (req, res) => {
    try {
        console.log('getMovies controller function');
        const response = await movieService.fetchMovies(req.query);

        if (response.err) {
            const errorResponse = errorResponseBody();
            errorResponse.err.message = response.err;
            return res.status(response.code).json(errorResponse);
        }

        const successResponse = successResponseBody();
        successResponse.data = response;
        successResponse.message = "Successfully fetched the movies";
        return res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = errorResponseBody();
        errorResponse.err.message = error.message;
        return res.status(500).json(errorResponse);
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies
}