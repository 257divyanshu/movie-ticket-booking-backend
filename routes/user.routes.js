const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

const routes = (app) => {
    app.patch(
        '/mba/api/v1/user/:id',
        userMiddleware.validateUpdateUserRequest,
        userController.updateUser
    )
}

module.exports = routes;