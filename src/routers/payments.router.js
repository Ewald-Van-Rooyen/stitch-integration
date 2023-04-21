const {initialPayment} = require("../controllers/payments.controller");
const paymentsRouter = require("express").Router();

paymentsRouter.post("/initiate",initialPayment);

module.exports = paymentsRouter;