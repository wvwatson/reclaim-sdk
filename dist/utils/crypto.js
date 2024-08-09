"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidSignedClaim = exports.recoverSignersOfSignedClaim = void 0;
const witness_sdk_1 = require("@reclaimprotocol/witness-sdk");
const ethers_1 = require("ethers");
/** recovers the addresses of those that signed the claim */
function recoverSignersOfSignedClaim({ claim, signatures }) {
    const dataStr = (0, witness_sdk_1.createSignDataForClaim)({ ...claim });
    return signatures.map(signature => (ethers_1.utils.verifyMessage(dataStr, signature).toLowerCase()));
}
exports.recoverSignersOfSignedClaim = recoverSignersOfSignedClaim;
/**
 * Asserts that the claim is signed by the expected witnesses
 * @param claim
 * @param expectedWitnessAddresses
 */
function assertValidSignedClaim(claim, expectedWitnessAddresses) {
    const witnessAddresses = recoverSignersOfSignedClaim(claim);
    // set of witnesses whose signatures we've not seen
    const witnessesNotSeen = new Set(expectedWitnessAddresses);
    for (const witness of witnessAddresses) {
        if (witnessesNotSeen.has(witness)) {
            witnessesNotSeen.delete(witness);
        }
    }
    // check if all witnesses have signed
    if (witnessesNotSeen.size > 0) {
        throw new Error(`Missing signatures from ${expectedWitnessAddresses.join(', ')}`);
    }
}
exports.assertValidSignedClaim = assertValidSignedClaim;
