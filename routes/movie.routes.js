const movieController = require('../controllers/movie.controller');
const movieMiddlewares = require('../middlewares/movie.middleware');

const routes = (app) => {
    // routes function takes express app object as parameter

    // CREATE
    app.post(
        '/mba/api/v1/movies',
        authMiddlewares.isAuthenticated,
        authMiddlewares.isAdminOrClient,
        movieMiddlewares.validateMovieCreateRequest,
        movieController.createMovie
    );

    // DELETE
    app.delete(
        '/mba/api/v1/movies/:movieId',
        movieController.deleteMovie
    );

    // READ
    app.get(
        '/mba/api/v1/movies/:movieId',
        movieController.getMovie
    );

    // UPDATE
    app.put(
        '/mba/api/v1/movies/:movieId',
        movieController.replaceMovie
    );

    // UPDATE
    app.patch(
        '/mba/api/v1/movies/:movieId',
        movieController.updateMovie
    );

    // READ
    app.get(
        '/mba/api/v1/movies',
        movieController.getMovies
    );
}

module.exports = routes;