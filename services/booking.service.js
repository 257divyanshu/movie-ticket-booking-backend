const Booking = require('../models/booking.model');
const { STATUS_CODES } = require('../utils/constants');

const createBooking = async (data) => {
    console.log("createBooking service function");

    try {
        const response = await Booking.create(data);
        return response;
    } catch (error) {
        console.log("service layer error");
        // console.log(error);

        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY };
        }
        throw error;
    }
}

const updateBooking = async (data, bookingId) => {
    console.log("updateBooking service function");

    try {
        const response = await Booking.findByIdAndUpdate(bookingId, data, {
            returnDocument: 'after', runValidators: true
        });

        if (!response) {
            throw {
                err: "No booking found for the given id",
                code: STATUS_CODES.NOT_FOUND
            }
        }

        return response;
    } catch (error) {
        console.log("service layer error");
        // console.log(error);

        if (error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw { err: err, code: STATUS_CODES.UNPROCESSABLE_ENTITY };
        }
        throw error;
    }
}

module.exports = {
    createBooking,
    updateBooking
}