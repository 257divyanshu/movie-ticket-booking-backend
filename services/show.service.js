const Show = require('../models/show.model');
const Theatre = require('../models/theatre.model');
const { STATUS_CODES } = require('../utils/constants');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * 
 * @param data -> object containing details of the show to be created
 * @returns -> object with the new show details
 */
const createShow = async (data) => {
    try {
        console.log("createShow service function");

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

const getShows = async (data) => {
    try {
        console.log("getShows service function");

        let filter = {};

        if (data.theatreId) {
            if (!ObjectId.isValid(data.theatreId)) {
                throw {
                    err: "Invalid theatreId",
                    code: STATUS_CODES.BAD_REQUEST
                };
            }

            filter.theatreId = data.theatreId;
        }
        if (data.movieId) {
            if (!ObjectId.isValid(data.movieId)) {
                throw {
                    err: "Invalid movieId",
                    code: STATUS_CODES.BAD_REQUEST
                };
            }

            filter.movieId = data.movieId;
        }

        const response = await Show.find(filter);

        if (response.length === 0) {
            throw {
                err: "No shows found for the specified criteria",
                code: STATUS_CODES.NOT_FOUND
            }
        }

        return response;
    } catch (error) {
        console.log("service layer error");
        // console.log(error);

        throw error;
    }
}

const deleteShow = async (id) => {
    try {
        console.log("deleteShow service function");

        if (!ObjectId.isValid(id)) {
            throw {
                err: "Invalid showId",
                code: STATUS_CODES.BAD_REQUEST
            };
        }
        
        const response = await Show.findByIdAndDelete(id);

        if (!response) {
            throw {
                err: 'No show found for the given showId',
                code: STATUS_CODES.NOT_FOUND
            }
        }

        return response;
    } catch (error) {
        console.log("service layer error");
        // console.log(error);

        throw error;
    }
}

module.exports = {
    createShow,
    getShows,
    deleteShow
}