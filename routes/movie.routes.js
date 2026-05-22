const movieController = require('../controllers/movie.controller');
const movieMiddlewares = require('../middlewares/movie.middleware');

const routes = (app) => {
    // routes function takes express app object as parameter
    app.post(
        '/mba/api/v1/movies', 
        movieMiddlewares.validateMovieCreateRequest,
        movieController.createMovie
    );
    app.delete(
        '/mba/api/v1/movies/:movieId', 
        movieController.deleteMovie
    );
    app.get(
        '/mba/api/v1/movies/:movieId', 
        movieController.getMovie
    );
}

module.exports = routes;