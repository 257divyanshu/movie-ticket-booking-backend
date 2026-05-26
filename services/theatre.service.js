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

module.exports = {
    createTheatre
}