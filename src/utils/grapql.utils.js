const {generateHeaders} = require("./requests.utils");
const {FETCH_VERBS} = require("./constants");

async function fetchGraphQLJson(operationsDoc, operationName, variables, authToken, contentType = null) {

    const result = await fetch(
        process.env.GRAPQL_URL,
        {
            headers: generateHeaders(authToken, contentType),
            method: FETCH_VERBS.POST,
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

    return await result.json();
}

async function fetchGraphQLString({operationsDoc, operationName, variables, authToken}) {

    return await fetch(
        process.env.GRAPQL_URL,
        {
            headers: generateHeaders(authToken),
            method: FETCH_VERBS.POST,
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );
}

module.exports = {fetchGraphQLJson, fetchGraphQLString}