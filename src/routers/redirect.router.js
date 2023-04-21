const {redirectCatch} = require("../controllers/redirect.controller");
const redirectRouter = require("express").Router();

redirectRouter.get("/", redirectCatch);

module.exports = redirectRouter;