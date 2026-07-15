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
        bookingMiddleware.validateBookingUpdateRequest,
        bookingController.updateBooking
    );

    app.get(
        '/mba/api/v1/bookings',
        authMiddleware.isAuthenticated,
        bookingController.getBookings
    );

    app.get(
        '/mba/api/v1/bookings/all',
        authMiddleware.isAuthenticated,
        authMiddleware.isAdmin,
        bookingController.getAllBookings
    );

    app.get(
        '/mba/api/v1/bookings/:bookingId',
        authMiddleware.isAuthenticated,
        bookingController.getBookingById
    );
}

module.exports = routes;    