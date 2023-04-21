const {fetchGraphQLJson} = require("../utils/grapql.utils");
const operationsDoc = `
  mutation UserInitiatePayment($amount: MoneyInput!, $payerReference: String, $beneficiaryReference: String, $externalReference: String, $merchant: String) {
    userInitiatePayment(input: {amount: $amount, payerReference: $payerReference, beneficiaryReference: $beneficiaryReference, externalReference: $externalReference, merchant: $merchant}) {
      paymentInitiation {
        amount
        date
        id
        status {
          __typename
        }
      }
    }
  }
`;

function executeUserInitiatePayment({
                                        amount,
                                        payerReference,
                                        beneficiaryReference,
                                        externalReference,
                                        merchant,
                                        authToken
                                    }) {
    return fetchGraphQLJson(
        operationsDoc,
        "UserInitiatePayment",
        {
            "amount": amount,
            "payerReference": payerReference,
            "beneficiaryReference": beneficiaryReference,
            "externalReference": externalReference,
            "merchant": merchant
        },
        authToken,
        "application/json"
    );
}

module.exports = {executeUserInitiatePayment}