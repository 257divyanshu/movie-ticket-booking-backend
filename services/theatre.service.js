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
        if (data && data.limit) {
            pagination.limit = data.limit;
        };
        if (data && data.skip) {
            pagination.skip = data.skip;
        };
        const theatres = await Theatre.find(query, {}, pagination);
        console.log(theatres);
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

module.exports = {
    createTheatre,
    deleteTheatre,
    getTheatre,
    getTheatres
}