const {error} = require("../utils/logging.utils");

function errorHandler(error, request, response, next) {
    if (response.headersSent) {
        return next(error);
    }
    response.status(500);
    response.render('error', {error: error});
}

function logErrors(error, request, response, next) {
    error(error.stack);
    next(error);
}

module.exports = {errorHandler, logErrors};