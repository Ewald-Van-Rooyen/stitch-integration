const {fetchClientToken} = require("../controllers/client.token.controller");
const clientTokenRouter = require("express").Router();

clientTokenRouter.get("/token",fetchClientToken);

module.exports = clientTokenRouter;