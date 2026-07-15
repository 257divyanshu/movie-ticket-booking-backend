const Booking = require('../models/booking.model');
const Show = require('../models/show.model');
const { STATUS_CODES } = require('../utils/constants');
const ObjectId = require('mongoose').Types.ObjectId;

const createBooking = async (data) => {
    console.log("createBooking service function");

    try {

        const show = data.show;

        const response = await Booking.create({
            show: show._id,
            user: data.user,
            noOfSeats: data.noOfSeats,
            totalCost: show.price * data.noOfSeats
        });

        return response;

    } catch (error) {
        console.log("service layer error");

        if (error.name === "ValidationError") {

            let err = {};

            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });

            throw {
                err,
                code: STATUS_CODES.UNPROCESSABLE_ENTITY
            };
        }

        throw error;
    }
}

const updateBooking = async (data, bookingId) => {
    console.log("updateBooking service function");

    try {
        const response = await Booking.findByIdAndUpdate(bookingId, data, {
            returnDocument: 'after', runValidators: true
        }).populate('show').populate('user');

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
        const response = await Booking.find(data).populate('show').populate('user');

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
        const response = await Booking.find().populate('show').populate('user');
        return response;
    } catch (error) {
        console.log("service layer error");
        // console.log(error);

        throw error;
    }
}

const getBookingById = async (bookingId) => {
    console.log("getBookingById service function");

    try {

        if (!ObjectId.isValid(bookingId)) {
            throw {
                err: "Invalid bookingId",
                code: STATUS_CODES.BAD_REQUEST
            };
        }

        const response = await Booking.findById(bookingId).populate('show').populate('user');

        if (!response) {
            throw {
                err: "No booking found for the given bookingId",
                code: STATUS_CODES.NOT_FOUND
            };
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