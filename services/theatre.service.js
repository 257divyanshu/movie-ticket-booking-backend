const Theatre = require('../models/theatre.model');

/**
 * Creates a new theatre document in the database.
 * @param {*} data Theatre data payload
 * @returns {Object} Created theatre document or validation error object
 */
const createTheatre = async (data) => {
    console.log('createTheatre service function');
    try {
        const response = await Theatre.create(data);
        return response;
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

/**
 * Deletes a theatre document by its id.
 * @param {*} id Theatre id
 * @returns {Object} Deleted theatre document or error object if theatre is not found
 */
const deleteTheatre = async (id) => {
    try {
        console.log('deleteTheatre service function');
        const response = await Theatre.findByIdAndDelete(id);
        console.log(response);
        if (!response) {
            return {
                err: "No theatre exists with the specified theatreId",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log('service layer error');
        console.log(error);
        throw error;
    }
}

/**
 * Fetches a theatre document by its id.
 * @param {*} id Theatre id
 * @returns {Object} Theatre document or error object if theatre is not found
 */
const getTheatre = async (id) => {
    try {
        console.log('getTheatre service function');
        const response = await Theatre.findById(id);
        console.log(response);
        if (!response) {
            return {
                err: "No theatre found for the given theatreId",
                code: 404
            }
        }
        return response;
    } catch (error) {
        console.log('service layer error');
        console.log(error);
        throw error;
    }
}

/**
 * Fetches theatre documents based on the provided filter criteria.
 * @param {*} filter Query filter object
 * @returns {Object} Matching theatre documents or error object if no theatres are found
 */
const getTheatres = async (data) => {
    console.log('getTheatres service function');
    try {
        let query = {};
        let pagination = {};
        if (data && data.name) {
            query.name = data.name;
        };
        if (data && data.city) {
            query.city = data.city;
        };
        if (data && data.pincode) {
            query.pincode = data.pincode;
        };
        if (data && data.movieId) {
            query.movies = { $all: data.movieId };
        };
        const perPage = data?.perPage ? Number(data.perPage) : 5;
        const page = data?.page ? Number(data.page) : 1;

        pagination.limit = perPage;
        pagination.skip = (page - 1) * perPage;
        const theatres = await Theatre.find(query, {}, pagination);
        // console.log(theatres);
        if (theatres.length == 0) {
            return {
                err: 'Not able to find the queries theatres',
                code: 404
            }
        }
        return theatres;
    } catch (error) {
        console.log('service layer error');
        console.log(error);
        throw error;
    }
}

/**
 * Replaces an existing theatre document completely by its id.
 * @param {*} id Theatre id
 * @param {*} data Complete theatre data payload
 * @returns {Object} Updated theatre document or error object
 */
const replaceTheatre = async (id, data) => {
    try {
        console.log('replaceTheatre service function');
        const theatre = await Theatre.findOneAndReplace({ _id: id }, data, { returnDocument: 'after', runValidators: true });
        console.log(theatre);
        if (!theatre) {
            return {
                err: "No theatre exists with the specified theatreId",
                code: 404
            }
        };
        return theatre;
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
 * Partially updates an existing theatre document by its id.
 * @param {*} id Theatre id
 * @param {*} data Partial theatre data payload
 * @returns {Object} Updated theatre document or error object
 */
const updateTheatre = async (id, data) => {
    try {
        console.log('updateTheatre service function');
        const theatre = await Theatre.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true });
        console.log(theatre);
        if (!theatre) {
            return {
                err: "No theatre exists with the specified theatreId",
                code: 404
            }
        };
        return theatre;
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
 * 
 * @param theatreId -> unique id of the theatre for which we want to update movies
 * @param movieIds -> array of movie ids that are expected to be updated in theatre
 * @param insert -> boolean that tells whether we want insert movies or remove them
 * @returns -> updated theatre object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
    try {
        console.log('updateMoviesInTheatres service function');
        const theatre = await Theatre.findByIdAndUpdate(
            theatreId,
            insert
                ? { $addToSet: { movies: { $each: movieIds } } }
                : { $pull: { movies: { $in: movieIds } } },
            { returnDocument: 'after' }
        );
        if (!theatre) {
            return {
                err: "No theatre found for the given theatreId",
                code: 404
            };
        }
        return theatre.populate('movies');
    } catch (error) {
        console.log('service layer error');
        console.log(error);
        throw error;
    }
}

const getMoviesInATheatre = async (id) => {
    try {
        console.log('getMoviesInATheatre service layer function');
        const theatre = await Theatre.findById(id, { name: 1, movies: 1, address: 1 }).populate('movies');
        if (!theatre) {
            return {
                err: 'No theatre with the given id found',
                code: 404
            }
        }
        return theatre;
    } catch (error) {
        console.log('service layer error');
        console.log(error);
        throw error;
    }
}

const checkMovieInATheatre = async (theatreId, movieId) => {
    try {
        console.log('checkMovieInATheatre service layer function');
        let response = await Theatre.findById(theatreId);
        console.log(response);
        if(!response) {
            return {
                err: "No such theatre found for the given id",
                code: 404
            }
        }
        return response.movies.indexOf(movieId) != -1;
    } catch (error) {
        console.log('service layer error');
        console.log(error);
        throw error;
    }
}

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getTheatres,
    replaceTheatre,
    updateTheatre,
    updateMoviesInTheatres,
    getMoviesInATheatre,
    checkMovieInATheatre
}