const Movie = require('../models/movie.model');

/**
 * Creates a new movie document in the database.
 * @param {*} data Movie data payload
 * @returns {Object} Created movie document or validation error object
 */
const createMovie = async (data) => {
    console.log('createMovie service function');
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        console.log('service layer error');
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return { err: err, code: 422 };
        } else {
            throw error;
        }
    }
}

/**
 * Deletes a movie document by its id.
 * @param {*} id Movie id
 * @returns {Object} Deleted movie document or error object if movie is not found
 */
const deleteMovie = async (id) => {
    try{
        console.log('deleteMovie service function');
        const response = await Movie.findByIdAndDelete(id);
        console.log(response);
        if (!response) {
            return {
                err: "No movie exists with the specified movieId",
                code: 404
            }
        };
        return response;
    }
    catch(error){
        console.log('service layer error');
        console.log(error);
        throw error;
    }
}

/**
 * Fetches a movie document by its id.
 * @param {*} id Movie id
 * @returns {Object} Movie document or error object if movie is not found
 */
const getMoviById = async (id) => {
    console.log('getMoviById service function');
    const movie = await Movie.findById(id);
    console.log(movie);
    if (!movie) {
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        }
    };
    return movie;
}

/**
 * Replaces an existing movie document completely by its id.
 * @param {*} id Movie id
 * @param {*} data Complete movie data payload
 * @returns {Object} Updated movie document or error object
 */
const replaceMovie = async (id, data) => {
    try {
        console.log('replaceMovie service function');
        const movie = await Movie.findOneAndReplace({_id: id}, data, { returnDocument: 'after', runValidators: true });
        console.log(movie);
        if (!movie) {
            return {
                err: "No movie exists with the specified movieId",
                code: 404
            }
        };
        return movie;
    } catch (error) {
        console.log('service layer error')
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return { err: err, code: 422 };
        } else {
            throw error;
        }
    }
}

/**
 * Partially updates an existing movie document by its id.
 * @param {*} id Movie id
 * @param {*} data Partial movie data payload
 * @returns {Object} Updated movie document or error object
 */
const updateMovie = async (id, data) => {
    try {
        console.log('updateMovie service function');
        const movie = await Movie.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true });
        console.log(movie);
        if (!movie) {
            return {
                err: "No movie exists with the specified movieId",
                code: 404
            }
        };
        return movie;
    } catch (error) {
        console.log('service layer error');
        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            console.log(err);
            return { err: err, code: 422 };
        } else {
            throw error;
        }
    }
}

/**
 * Fetches movie documents based on the provided filter criteria.
 * @param {*} filter Query filter object
 * @returns {Object} Matching movie documents or error object if no movies are found
 */
const fetchMovies = async (filter) => {
    console.log('fetchMovies service function');
    let query = {};
    if (filter.name) {
        query.name = filter.name;
    }
    let movies = await Movie.find(query);
    console.log(movies);
    if (movies.length == 0) {
        return {
            err: 'Not able to find the queries movies',
            code: 404
        }
    }
    return movies;
}

module.exports = {
    createMovie,
    deleteMovie,
    getMoviById,
    replaceMovie,
    updateMovie,
    fetchMovies
}