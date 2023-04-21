const {fetchGraphQLJson} = require("../utils/grapql.utils");

const operationsDoc = `
  mutation CreateRefund($amount: MoneyInput!, $reason: RefundReason!, $nonce: String!, $beneficiaryReference: String!, $paymentRequestId: ID!) {
    clientRefundInitiate(input: {amount: $amount, reason: $reason, nonce: $nonce, beneficiaryReference: $beneficiaryReference, paymentRequestId: $paymentRequestId}) {
      refund {
        id
        paymentInitiationRequest {
          id
        }
      }
    }
  }
`;

function executeCreateRefund({amount, reason, nonce, beneficiaryReference, paymentRequestId, authToken}) {
    return fetchGraphQLJson(
        operationsDoc,
        "CreateRefund",
        {
            amount,
            reason,
            nonce,
            beneficiaryReference,
            paymentRequestId
        },
        authToken,
        "application/json"
    );
}

module.exports = {executeCreateRefund}