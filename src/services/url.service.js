const {encodeBody} = require("../utils/requests.utils");

function buildAuthorizationUrl(
    {clientId,
        challenge,
        redirectUri,
        state,
        nonce,
        scopes,
        authorizedUrl}
) {

    const body = {
        client_id: clientId,
        code_challenge: challenge,
        code_challenge_method: "S256",
        redirect_uri: redirectUri,
        scope: scopes.join(" "),
        response_type: "code",
        nonce: nonce,
        state: state,
    };

    const url= authorizedUrl || process.env.CONNECT_AUTHORIZE_URL;

    const searchString = encodeBody(body);

    return `${url}?${searchString}`;
}

module.exports = {buildAuthorizationUrl}
