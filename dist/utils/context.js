"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeContext = exports.encodeContext = void 0;
const canonicalize_1 = __importDefault(require("canonicalize"));
const ethers_1 = require("ethers");
function encodeContext(ctx, fromProof) {
    const context = {
        contextMessage: !fromProof ? ethers_1.utils.keccak256(ethers_1.utils.toUtf8Bytes(ctx.contextMessage)) : ctx.contextMessage,
        contextAddress: ctx.contextAddress,
        sessionId: ctx.sessionId,
    };
    return (0, canonicalize_1.default)(context);
}
exports.encodeContext = encodeContext;
function decodeContext(ctx) {
    const context = JSON.parse(ctx);
    // context.contextMessage = utils.toUtf8String(context.contextMessage)
    return context;
}
exports.decodeContext = decodeContext;
