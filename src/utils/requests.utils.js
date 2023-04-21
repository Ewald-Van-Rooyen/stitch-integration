const crypto = require("crypto");

function base64UrlEncode(byteArray) {
    const charCodes = String.fromCharCode(...byteArray);
    return Buffer.from(charCodes).toString('base64')
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

function generateRandomStateOrNonce() {
    const randomBytes = crypto.getRandomValues(new Uint8Array(32));
    return base64UrlEncode(randomBytes);
}

function encodeBody(body) {
    return Object.entries(body)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&");
}

function generateHeaders(authorizationToken = null, contentType = null) {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    if (contentType) {
        headers["Content-Type"] = contentType;
    }

    if (authorizationToken) {
        headers["Authorization"] = `Bearer ${authorizationToken}`;
    }

    return headers;
}

module.exports = {encodeBody, generateHeaders, generateRandomStateOrNonce}