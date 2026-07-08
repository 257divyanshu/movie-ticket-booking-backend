const showController = require('../controllers/show.controller');
const authMiddlewares = require('../middlewares/auth.middleware');
const showMiddlewares = require('../middlewares/show.middleware');

const routes = (app) => {
    app.post(
        '/mba/api/v1/shows',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        showMiddlewares.validateCreateShowRequest,
        showController.createShow
    );

    app.get(
        '/mba/api/v1/shows',
        showController.getShows
    );
}

module.exports = routes;