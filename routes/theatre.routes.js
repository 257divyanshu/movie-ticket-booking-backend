const theatreController = require('../controllers/theatre.controller');
const theatreMiddlewares = require('../middlewares/theatre.middleware')

const routes = (app) => {

    // CREATE
    app.post(
        '/mba/api/v1/theatres',
        theatreMiddlewares.validateTheatreCreateRequest,
        theatreController.createTheatre
    );

    // DELETE
    app.delete(
        '/mba/api/v1/theatres/:theatreId',
        theatreController.deleteTheatre
    );

    // READ
    app.get(
        '/mba/api/v1/theatres/:theatreId',
        theatreController.getTheatre
    );

    // READ
    app.get(
        '/mba/api/v1/theatres',
        theatreController.getTheatres
    );

    // UPDATE
    app.put(
        '/mba/api/v1/theatres/:theatreId',
        theatreController.replaceTheatre
    );

    // UPDATE
    app.patch(
        '/mba/api/v1/theatres/:theatreId',
        theatreController.updateTheatre
    );

    // UPDATE
    app.patch(
        '/mba/api/v1/theatres/:theatreId/movies',
        theatreMiddlewares.validateUpdateMoviesRequest,
        theatreController.updateMovies
    );

    // READ
    app.get(
        '/mba/api/v1/theatres/:theatreId/movies',
        theatreController.getMovies
    );
}

module.exports = routes;