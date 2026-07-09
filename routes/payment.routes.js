const paymentController = require('../controllers/payment.controller');
const authMiddlewares = require('../middlewares/auth.middleware');
const paymentMiddlewares = require('../middlewares/payment.middleware');
const routes = (app) => {
    app.post(
        '/mba/api/v1/payment',
        authMiddlewares.isAuthenticated,
        paymentMiddlewares.verifyPaymentCreateRequest,
        paymentController.createPayment
    )
}

module.exports = routes;