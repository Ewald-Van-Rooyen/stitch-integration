const {fetchGraphQLJson} = require("../utils/grapql.utils");
const operationsDoc = `
  query GetAccounts {
    user {
      bankAccounts {
        accountNumber
        accountType
        bankId
        branchCode
        id
        name
      }
    }
  }
`;

function fetchGetAccounts(authToken) {
    return fetchGraphQLJson(
        operationsDoc,
        "GetAccounts",
        {},
        authToken,
        "application/json"
    );
}

module.exports = {fetchGetAccounts};
