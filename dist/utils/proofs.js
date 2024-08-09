"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformProofsToverify = exports.getProofsFromRequestBody = void 0;
function getProofsFromRequestBody(requestBody) {
    const proofs = JSON.parse(decodeURIComponent(requestBody)).proofs;
    return proofs;
}
exports.getProofsFromRequestBody = getProofsFromRequestBody;
function transformProofsToverify(proofs) {
    return proofs.map(p => {
        return {
            ...p,
            parameters: JSON.parse(p.parameters)
        };
    });
}
exports.transformProofsToverify = transformProofsToverify;
