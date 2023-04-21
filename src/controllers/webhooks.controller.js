const {executeClientWebhookAdd} = require("../graphql/webhook.query");

async function createWebhook(request, response) {
    const {clientToken} = request.session;
    const {errors, data} = await executeClientWebhookAdd(clientToken);

    if (errors) {
        console.error(errors);
        return response.status(500).json(errors);
    }

    console.log(data);
    response.send("Setup webhook success");
}

module.exports = {createWebhook};
