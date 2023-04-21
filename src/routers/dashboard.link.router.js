const {generateDashboardLink} = require("../controllers/dashboard.link.controller");
const dashboardLinkRouter = require("express").Router();

dashboardLinkRouter.get("/link", generateDashboardLink);

module.exports = dashboardLinkRouter;