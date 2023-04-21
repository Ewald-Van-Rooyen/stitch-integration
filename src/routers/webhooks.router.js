const {createWebhook} = require("../controllers/webhooks.controller");
const webhooksRouter = require("express").Router();

webhooksRouter.get("/setup", createWebhook);

module.exports = webhooksRouter;