const {getAuthorizationUrl, refreshAuthenticationToken} = require("../controllers/authentication.controller");
const authenticationRouter = require("express").Router();

authenticationRouter.get("/url", getAuthorizationUrl);
authenticationRouter.get("/refreshToken", refreshAuthenticationToken);

module.exports = authenticationRouter;