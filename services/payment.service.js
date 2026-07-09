const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const { STATUS_CODES, BOOKING_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const createPayment = async (data) => {
    console.log('createPayment service function');

    try {
        const booking = await Booking.findById(data.bookingId);

        if (!booking) {
            throw {
                err: 'No booking found',
                code: STATUS_CODES.NOT_FOUND
            }
        }

        if (booking.status === BOOKING_STATUS.successfull) {
            throw {
                err: 'Payment has already been completed for this booking',
                code: STATUS_CODE.FORBIDDEN
            }
        }

        if (booking.userId.toString() !== data.userId.toString()) {
            throw {
                err: "You can only make a payment for your booking",
                code: STATUS_CODES.FORBIDDEN
            };
        }

        if (booking.status !== BOOKING_STATUS.processing) {
            throw {
                err: "Payment can only be made for bookings that are in progress",
                code: STATUS_CODES.BAD_REQUEST
            }
        }

        const bookingTime = booking.createdAt.getTime();
        const currentTime = Date.now();

        if ((currentTime - bookingTime) / 60000 > 5) {
            booking.status = BOOKING_STATUS.expired;
            await booking.save();
            return booking;
        }

        const payment = await Payment.create({
            bookingId: data.bookingId,
            amount: data.amount
        });

        if (payment.amount !== booking.totalCost) {
            payment.status = PAYMENT_STATUS.failed;
            booking.status = BOOKING_STATUS.cancelled;
        } else {
            payment.status = PAYMENT_STATUS.success;
            booking.status = BOOKING_STATUS.successfull;
        }

        await booking.save();
        await payment.save();

        return booking;
    } catch (error) {
        console.log("service layer error");
        console.log(error);

        throw error;
    }
}

module.exports = {
    createPayment
}