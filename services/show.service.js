const Show = require('../models/show.model');
const Theatre = require('../models/theatre.model');
const { STATUS_CODES } = require('../utils/constants');

/**
 * 
 * @param data -> object containing details of the show to be created
 * @returns -> object with the new show details
 */
const createShow = async (data) => {
    try {
        console.log("createShow service function")

        const theatre = await Theatre.findById(data.theatreId);

        if (!theatre) {
            throw {
                err: 'No theatre exists with the specified theatreId',
                code: STATUS_CODES.NOT_FOUND
            }
        }

        if (theatre.movies.indexOf(data.movieId) === -1) {
            throw {
                err: 'Movie is currently not available in the requested theatre',
                code: STATUS_CODES.NOT_FOUND
            }
        }

        const response = await Show.create(data);
        return response;
    } catch (error) {
        console.log("service layer error");
        // console.log(error);

        if (error.name === 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS_CODES.UNPROCESSABLE_ENTITY
            }
        }

        throw error;
    }
}

module.exports = {
    createShow
}