const {encodeBody, generateHeaders} = require("../utils/requests.utils");
const {GRANT_TYPES, FETCH_VERBS} = require("../utils/constants");

async function retrieveTokenUsingClientSecret(clientId, clientSecret, scopes) {
    const body = {
        grant_type: GRANT_TYPES.CLIENT_CREDENTIALS,
        client_id: clientId,
        scope: scopes.join(" "),
        audience: process.env.CONNECT_TOKEN_URL,
        client_secret: clientSecret,
    };

    const bodyString = encodeBody(body);

    const response = await fetch(process.env.CONNECT_TOKEN_URL, {
        method: FETCH_VERBS.POST,
        headers: generateHeaders(),
        body: bodyString,
    });

    return await response.json();
}

module.exports = {retrieveTokenUsingClientSecret};