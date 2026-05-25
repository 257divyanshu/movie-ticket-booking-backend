const Movie = require('../models/movie.model');

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
            console.log("servie layer error: ")
            console.log(err);
            return { err: err, code: 422 };
        } else {
            throw error;
        }
    }
}

const deleteMovie = async (id) => {
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
    updateMovie,
    fetchMovies
}