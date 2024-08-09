"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShortenedUrl = exports.getCallbackIdFromUrl = exports.generateCallbackUrl = exports.isValidUrl = exports.generateUuid = void 0;
const uuid_1 = require("uuid");
function generateUuid() {
    return (0, uuid_1.v4)();
}
exports.generateUuid = generateUuid;
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.isValidUrl = isValidUrl;
function generateCallbackUrl(baseUrl, callbackId) {
    // check if valid url
    if (!isValidUrl(baseUrl)) {
        throw new Error('Invalid URL');
    }
    const id = callbackId ? callbackId : generateUuid();
    //check for trailing slash
    if (baseUrl.endsWith('/')) {
        // remove trailing slash
        baseUrl = baseUrl.slice(0, -1);
    }
    return `${baseUrl}?callbackId=${id}`;
}
exports.generateCallbackUrl = generateCallbackUrl;
function getCallbackIdFromUrl(_url) {
    // check if valid url
    if (!isValidUrl(_url)) {
        throw new Error('Invalid URL');
    }
    const url = new URL(_url);
    const urlParams = new URLSearchParams(url.search);
    const callbackId = urlParams.get('callbackId');
    if (!callbackId) {
        throw new Error('Callback Id not found in URL');
    }
    else {
        return callbackId;
    }
}
exports.getCallbackIdFromUrl = getCallbackIdFromUrl;
async function getShortenedUrl(url) {
    // const headers = new Headers()
    // headers.append('Content-Type', 'application/json')
    try {
        const response = await fetch('https://rclm.link/short', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullUrl: url
            })
        });
        const res = await response.json();
        const shortenedVerificationUrl = res.shortUrl;
        return shortenedVerificationUrl;
    }
    catch (err) {
        return url;
    }
}
exports.getShortenedUrl = getShortenedUrl;
