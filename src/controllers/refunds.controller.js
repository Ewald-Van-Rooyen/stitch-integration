const {REFUND_REASONS} = require("../utils/constants");
const {executeCreateRefund} = require("../graphql/create.refund.query");
const {LocalStorage} = require("node-localstorage");
const localStorage = new LocalStorage('./local');
async function createRefund(request, response) {
    const clientToken = request.session.clientToken;
    const nonce = localStorage.getItem('nonce');

    const amount = request.body.amount;
    const reason = REFUND_REASONS.DUPLICATE || request.body.reason;
    const beneficiaryReference = request.body.beneficiaryReference;
    const paymentRequestId = request.body.paymentRequestId;

    const {error, data} = await executeCreateRefund(
        {
            nonce,
            amount,
            reason,
            beneficiaryReference,
            paymentRequestId,
            authToken: clientToken
        });

    if (error) {
        console.log(error);
        response.send("SERVER ERROR");
    } else {
        console.log(data);
        response.send("Refunded");
    }
}

module.exports = {createRefund}