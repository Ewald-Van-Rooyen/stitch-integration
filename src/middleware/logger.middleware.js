const logger =  require("../utils/logging.utils");

function loggerMiddleware(request, response, next) {
    request.logger = logger;
    next();
}

module.exports = {loggerMiddleware};
