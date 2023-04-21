const {buildAuthorizationUrl} = require("../services/url.service");
const {LocalStorage} = require("node-localstorage");
const {refreshUserToken} = require("../services/user.token.service");
const localStorage = new LocalStorage('./local');

async function getAuthorizationUrl(request, response) {
    const {authorizedUrl} = request.query;
    const challenge = localStorage.getItem("challenge");
    const state = localStorage.getItem("state");
    const nonce = localStorage.getItem("challenge");

    const authorizationUrlString = buildAuthorizationUrl({
            clientId: process.env.CLIENT_ID,
            challenge,
            redirectUri: process.env.REDIRECT_URI,
            state,
            nonce,
            scopes: JSON.parse(process.env.SCOPES),
            authorizedUrl
        }
    );

    response.send(authorizationUrlString);
}

async function refreshAuthenticationToken(request, response) {
    const {refreshToken} = request.session;

    await refreshUserToken({
            clientId: process.env.CLIENT_ID,
            clientSecret: [process.env.CLIENT_SECRET],
            refreshToken
        }
    );

    response.send("Refreshed");
};

module.exports = {getAuthorizationUrl, refreshAuthenticationToken};