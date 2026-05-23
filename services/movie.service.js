const Movie = require('../models/movie.model');

const createMovie = async (data) => {
    console.log('createMovie service function');
    const movie = await Movie.create(data);
    return movie;
}

const deleteMovie = async (id) => {
    console.log('deleteMovie service function');
    const response = await Movie.findByIdAndDelete(id);
    return response;
}

const getMoviById = async (id) => {
    console.log('getMoviById service function');
    const movie = await Movie.findById(id);
    if(!movie) {
        return {
            err: "No movie found for the corresponding id provided",
            code: 404
        }
    };
    return movie;
}

module.exports = {
    createMovie,
    deleteMovie,
    getMoviById
}