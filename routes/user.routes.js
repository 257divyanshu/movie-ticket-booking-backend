const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const routes = (app) => {
    app.patch(
        '/mba/api/v1/user/:id',
        authMiddleware.isAuthenticated,
        userMiddleware.validateUpdateUserRequest,
        authMiddleware.isAdmin,
        userController.updateUser
    )
}

module.exports = routes;