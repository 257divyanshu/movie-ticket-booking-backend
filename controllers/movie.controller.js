const Movie = require('../models/movie.model');

/**
 * Controller function to create a new movie
 * @returns newly created movie
 */
const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        return res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: 'Successfully created a new movie'
        })
    } catch (err) {
        console.log("controller layer error (createMovie):")
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err,
            data: {},
            message: 'Something went wrong'
        });
    }
};

/**
 * Controller function to delete a movie
 * @returns result object (not the deleted object)
 */
const deleteMovie = async (req, res) => {
    try {
        const response = await Movie.deleteOne({
            _id: req.params.movieId
        });
        return res.status(200).json({
            success: true,
            error: {},
            data: response,
            message: "Successfully delete the movie"
        });
    }
    catch (err) {
        console.log("controller layer error (deleteMovie):");
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err,
            data: {},
            message: "Something went wrong"
        });
    }
}

const getMovie = async (req, res) => {
    try {
        const response = await Movie.findById(req.params.movieId);
        console.log(response);
        if (!response) {
            return res.status(404).json({
                success: false,
                error: "Movie not found",
                data: null,
                message: "No movie exists with the given movie ID"
            });
        }
        return res.status(200).json({
            success: true,
            error: {},
            data: response,
            message: "Successfully fetched the movie"
        });
    }
    catch (err) {
        console.log("controller layer error (getMovie):");
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err,
            data: {},
            message: "Something went wrong"
        });
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
}