const {createRefund} = require("../controllers/refunds.controller");
const refundsRouter = require("express").Router();

refundsRouter.get("/create", createRefund);

module.exports = refundsRouter;