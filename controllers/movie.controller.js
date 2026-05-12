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
        console.log("controller layer error:")
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err,
            data: {},
            message: 'Something went wrong'
        });
    }
};

module.exports = {
    createMovie
}