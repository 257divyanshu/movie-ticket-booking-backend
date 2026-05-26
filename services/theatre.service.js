const Theatre = require('../models/theatre.model');

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

const getTheatres = async () => {
    console.log('getTheatres service function');
    try {
        const response = await Theatre.find({});
        return response;
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