"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWitnessesForClaim = void 0;
const witness_sdk_1 = require("@reclaimprotocol/witness-sdk");
async function getWitnessesForClaim(epoch, identifier, timestampS) {
    const beacon = (0, witness_sdk_1.makeBeacon)();
    const state = await beacon.getState(epoch);
    const witnessList = (0, witness_sdk_1.fetchWitnessListForClaim)(state, identifier, timestampS);
    return witnessList.map(w => w.id.toLowerCase());
}
exports.getWitnessesForClaim = getWitnessesForClaim;
