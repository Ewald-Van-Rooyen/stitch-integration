const {fetchUserToken} = require("../services/user.token.service");
const {LocalStorage} = require("node-localstorage");
const localStorage = new LocalStorage('./local');

async function redirectCatch(request, response) {
    const verifier = localStorage.getItem("verifier");
    let accessToken, refreshToken, linkedAccountToken = null;

    const code = request.query.code;

    const tokens = await fetchUserToken({
            clientId: process.env.CLIENT_ID,
            redirectUri: process.env.REDIRECT_URI,
            code,
            clientSecret: process.env.CLIENT_SECRET,
            verifier
        }
    );

    if (tokens?.scope?.indexOf('client_paymentauthorizationrequest') !== -1) {
        linkedAccountToken = tokens.access_token;
        request.session.linkedAccountToken = linkedAccountToken;
    } else {
        accessToken = tokens.access_token;
        refreshToken = tokens.refresh_token;

        request.session.accessToken = accessToken;
        request.session.refreshToken = refreshToken;
    }

    response.send({accessToken, refreshToken, linkedAccountToken});
}

module.exports = {redirectCatch};