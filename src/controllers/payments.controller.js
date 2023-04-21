const {executeUserInitiatePayment} = require("../graphql/initiate.payment.query");
async function initialPayment(request, response)  {
    const {linkedAccountToken} = request.session;

    const amount = request.body.amount;
    const payerReference = request.body.payerReference;
    const beneficiaryReference = request.body.beneficiaryReference;
    const externalReference = request.body.externalReference;
    const merchant = request.body.merchant;

    const {errors,data} = await executeUserInitiatePayment({
        amount,
        payerReference,
        beneficiaryReference,
        externalReference,
        merchant,
        authToken: linkedAccountToken
    });

    if (errors) {
        console.error(errors);
        return response.status(500).json(errors);
    }

    const userInteractionUrl = data?.errors[0]?.extensions?.userInteractionUrl;
    console.log(data);
    response.send(userInteractionUrl);
}

module.exports = {initialPayment};