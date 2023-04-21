const {fetchGetAccounts} = require("../graphql/accounts.query");
const {executeCreateAccountLinkingRequest} = require("../graphql/linkpay.query");

async function fetchAccounts(request, response) {
    const {accessToken} = request.session;
    const {errors, data} = await fetchGetAccounts(accessToken);

    if (errors) {
        console.error(errors);
        return response.status(500).json(errors)
    }

    console.log(data);
    return response.json(data?.user?.bankAccounts);
}

async function createAccountLinking(request, response) {
    const {clientToken} = request.session;
    const {errors, data} = await executeCreateAccountLinkingRequest(clientToken);

    if (errors) {
        console.error(errors);
        return response.status(500).json(errors)
    }

    const authorizationRequestUrl = data.data?.clientPaymentAuthorizationRequestCreate?.authorizationRequestUrl;
    request.session.authorizationRequestUrl = authorizationRequestUrl;

    console.log(authorizationRequestUrl);
    response.send("Account was linked successfully");
}

module.exports = {fetchAccounts, createAccountLinking};