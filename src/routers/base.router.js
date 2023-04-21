const baseRouter = require("express").Router();

baseRouter.get("/ping", (request, response) => {
    response.send('Ping');
});

module.exports = baseRouter;