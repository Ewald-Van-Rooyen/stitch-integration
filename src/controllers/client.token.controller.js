const {retrieveTokenUsingClientSecret} = require("../services/client.token.service");

async function fetchClientToken(request, response) {
    const data = await retrieveTokenUsingClientSecret(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        ["client_paymentrequest", "client_paymentauthorizationrequest"]);
    const clientToken = data.access_token;
    request.session.clientToken = clientToken;

    request.logger.info(clientToken);
    response.send(clientToken);
}

module.exports = {fetchClientToken};