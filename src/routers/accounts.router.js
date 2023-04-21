const {fetchAccounts, createAccountLinking} = require("../controllers/accounts.controller");
const accountsRouter = require("express").Router();

accountsRouter.get("/", fetchAccounts);
accountsRouter.get("/linking", createAccountLinking);

module.exports = accountsRouter;