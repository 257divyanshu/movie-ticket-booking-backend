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

const getBookings = async (data) => {
    console.log("getBookings service function");

    try {
        const response = await Booking.find(data);

        if (response.length === 0) {
            throw {
                err: "No booking found for the given userId",
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

const getAllBookings = async () => {
    console.log("getAllBookings service function");

    try {
        const response = await Booking.find();
        return response;
    } catch (error) {
        console.log("service layer error");
        // console.log(error);

        throw error;
    }
}

const getBookingById = async (bookingId, userId) => {
    console.log("getBookingById service function");

    try {
        const response = await Booking.findById(bookingId);

        if (!response) {
            throw {
                err: 'No booking records found for the given bookingId',
                code: STATUS_CODES.NOT_FOUND
            }
        }

        if (response.userId.toString() !== userId.toString()) {
            throw {
                err: "You are not authorized to access another user's booking",
                code: STATUS_CODES.FORBIDDEN
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
    createBooking,
    updateBooking,
    getBookings,
    getAllBookings,
    getBookingById
}