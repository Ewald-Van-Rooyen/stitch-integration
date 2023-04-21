require('dotenv').config();

const express = require("express");
const morgan = require("morgan");

const {generateRandomStateOrNonce} = require("./src/utils/requests.utils");

const pkceChallenge = require("pkce-challenge").default;
const session = require('express-session');

// TODO move to index file
const clientTokenRouter = require("./src/routers/client.token.router");
const baseRouter = require("./src/routers/base.router");
const dashboardLinkRouter = require("./src/routers/dashboard.link.router");
const refundsRouter = require("./src/routers/refunds.router");
const accountsRouter = require("./src/routers/accounts.router");
const webhooksRouter = require("./src/routers/webhooks.router");
const authenticationRouter = require("./src/routers/authentication.router");
const paymentsRouter = require("./src/routers/payments.router");
const redirectRouter = require("./src/routers/redirect.router");
const {errorHandler, logErrors} = require("./src/middleware/error.middleware");
const {info} = require("./src/utils/logging.utils");
const {loggerMiddleware} = require("./src/middleware/logger.middleware");

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./local');

const app = express();
const port = 3000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: {maxAge: 400000},
    resave: false
}));

app.use(morgan("tiny"));

const code = pkceChallenge(128);
const challenge = code.code_challenge;
const verifier = code.code_verifier;

const state = generateRandomStateOrNonce();
const nonce = generateRandomStateOrNonce();

// Store UUID's in local storage to make them available for the entire service
localStorage.setItem('challenge', challenge);
localStorage.setItem('verifier', verifier);

localStorage.setItem('nonce', nonce);
localStorage.setItem('state', state);

app.use(express.json());
app.use(errorHandler);
app.use(logErrors);
app.use(loggerMiddleware);

// Setup routes
app.use("/client", clientTokenRouter);
app.use("/base", baseRouter);
app.use("/dashboard", dashboardLinkRouter);
app.use("/refunds", refundsRouter);
app.use("/accounts", accountsRouter);
app.use("/webhooks", webhooksRouter);
app.use("/authentication", authenticationRouter);
app.use("/payments", paymentsRouter);
app.use("/return", redirectRouter);

app.listen(port, () => {
    info(`Server live on port:${port}`);
});