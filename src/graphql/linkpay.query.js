const {fetchGraphQLJson} = require("../utils/grapql.utils");

const operationsDoc = `
  mutation CreateAccountLinkingRequest {
    clientPaymentAuthorizationRequestCreate(input: {beneficiary: {bankAccount: {name: "Sample Account", bankId: absa, accountNumber: "1234567890", accountType: current, beneficiaryType: private, reference: "TestBeneficiary"}}, payer: {email: "sampleuser@example.com", name: "Sample User", reference: "TestPayer", phoneNumber: "27821234567"}}) {
      authorizationRequestUrl
    }
  }
`;

function executeCreateAccountLinkingRequest(authToken) {
    return fetchGraphQLJson(
        operationsDoc,
        "CreateAccountLinkingRequest",
        {},
        authToken,
        "application/json"
    );
}

module.exports = {executeCreateAccountLinkingRequest};