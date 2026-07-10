const paymentController = require('../controllers/payment.controller');
const authMiddlewares = require('../middlewares/auth.middleware');
const paymentMiddlewares = require('../middlewares/payment.middleware');
const routes = (app) => {
    app.post(
        '/mba/api/v1/payments',
        authMiddlewares.isAuthenticated,
        paymentMiddlewares.verifyPaymentCreateRequest,
        paymentController.createPayment
    );

    app.get(
        '/mba/api/v1/payments/:paymentId',
        authMiddlewares.isAuthenticated,
        paymentController.getPaymentDetailsById
    );

    app.get(
        '/mba/api/v1/payments',
        authMiddlewares.isAuthenticated,
        paymentController.getAllPayments
    );
}

module.exports = routes;