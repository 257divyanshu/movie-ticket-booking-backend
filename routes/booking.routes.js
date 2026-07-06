const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const bookingMiddleware = require('../middlewares/booking.middleware');

const routes = (app) => {
    app.post(
        '/mba/api/v1/bookings',
        authMiddleware.isAuthenticated,
        bookingMiddleware.validateBookingCreateRequest,
        bookingController.createBooking
    )

    app.patch(
        '/mba/api/v1/bookings/:bookingId',
        authMiddleware.isAuthenticated,
        bookingMiddleware.canChangeStatus,
        bookingController.updateBooking
    );
}

module.exports = routes;    