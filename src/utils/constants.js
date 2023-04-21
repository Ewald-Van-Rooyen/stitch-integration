const GRANT_TYPES = Object.freeze({
    CLIENT_CREDENTIALS: "client_credentials",
    AUTHORIZATION_CODE: "authorization_code",
    REFRESH_TOKEN: "refresh_token"
});

const FETCH_VERBS = Object.freeze({
    POST: "post"
});

const REFUND_REASONS = Object.freeze({
    DUPLICATE: "duplicate",
    FRAUDULENT: "fraudulent",
    REQUESTED_BY_USER: "requested_by_user"
});

module.exports = {GRANT_TYPES, FETCH_VERBS, REFUND_REASONS}