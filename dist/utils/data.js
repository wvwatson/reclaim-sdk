"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = void 0;
function encodeBase64(str) {
    return Buffer.from(JSON.stringify(str)).toString('base64');
}
exports.encodeBase64 = encodeBase64;
function decodeBase64(str) {
    return JSON.parse(Buffer.from(str, 'base64').toString('utf-8'));
}
exports.decodeBase64 = decodeBase64;
