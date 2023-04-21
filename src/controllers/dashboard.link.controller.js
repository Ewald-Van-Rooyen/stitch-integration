const {
    fetchGenerateDashboardLink
} = require("../graphql/generate.dashboard.link.query");

async function generateDashboardLink(request, response) {
    const authorizationToken = request.session.clientToken;
    const {errors, data} = await fetchGenerateDashboardLink(authorizationToken);

    if (errors) {
        console.error(errors);
        response.send("Server error");
    }

    const dashboardLink = data?.client?.webhookLogin?.url;
    console.log(data);
    response.send(dashboardLink)
}

module.exports = {generateDashboardLink};