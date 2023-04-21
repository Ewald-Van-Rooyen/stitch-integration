const {fetchGraphQLJson} = require("../utils/grapql.utils");
const operationsDoc = `
  mutation clientWebhookAdd {
    clientWebhookAdd(input: {url: "${process.env.WEBHOOK_URL}", filterTypes: ["refund"]}) {
      url
      filterTypes
      secret
      id
    }
  }
`;

function executeClientWebhookAdd(authToken) {
    return fetchGraphQLJson(
        operationsDoc,
        "clientWebhookAdd",
        {},
        authToken,
        "application/json"
    );
}

module.exports = {executeClientWebhookAdd};