const {fetchGraphQLJson} = require("../utils/grapql.utils");
const operationsDoc = `
  query GenerateDashboardLink {
    client {
      webhookLogin {
        url
      }
    }
  }
`;

function fetchGenerateDashboardLink(authorizationToken) {
    return fetchGraphQLJson(
        operationsDoc,
        "GenerateDashboardLink",
        {},
        authorizationToken,
        "application/json"
    );
}

module.exports = {fetchGenerateDashboardLink};