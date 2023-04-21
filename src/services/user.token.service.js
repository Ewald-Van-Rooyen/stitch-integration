const {GRANT_TYPES, FETCH_VERBS} = require("../utils/constants");
const {encodeBody, generateHeaders} = require("../utils/requests.utils");

async function fetchUserToken({
    clientId,
    redirectUri,
    code,
    clientSecret,
    verifier}
) {
    const body = {
        grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
        client_secret: clientSecret,
    };

    const bodyString = encodeBody(body);
//secure-local.stitchmoney
    const response = await fetch(process.env.CONNECT_TOKEN_URL, {
        method: FETCH_VERBS.POST,
        headers: generateHeaders(),
        body: bodyString,
    });

    const responseBody = await response.json();
    console.log("Tokens: ", responseBody);
    return responseBody;
}

async function refreshUserToken({clientId, clientSecret, refreshToken}) {
    const body = {
        grant_type: GRANT_TYPES.REFRESH_TOKEN,
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken
    };

    const bodyString = encodeBody(body);

    await fetch(process.env.CONNECT_TOKEN_URL, {
        method: FETCH_VERBS.POST,
        headers: generateHeaders(),
        body: bodyString,
    });
}


module.exports = {
    fetchUserToken,
    refreshUserToken
};
