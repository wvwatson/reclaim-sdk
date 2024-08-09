"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reclaim = void 0;
const witness_sdk_1 = require("@reclaimprotocol/witness-sdk");
const eth_1 = require("@reclaimprotocol/witness-sdk/lib/signatures/eth");
const canonicalize_1 = __importDefault(require("canonicalize"));
const ethers_1 = require("ethers");
const pino_1 = __importDefault(require("pino"));
const utils_1 = require("../utils");
const utils_2 = require("../utils");
const CustomProvider_1 = require("./CustomProvider");
const HttpsProvider_1 = require("./HttpsProvider");
const Template_1 = __importDefault(require("./Template"));
const logger = (0, pino_1.default)();
/** Reclaim class */
class Reclaim {
    constructor() {
        /**
         * function to request proofs from Reclaim
         * @param request Proof request
         * @returns {TemplateInstance} Template instance
         */
        this.requestProofs = (request) => {
            const callbackUrl = (0, utils_2.generateCallbackUrl)(request.baseCallbackUrl, request.callbackId);
            const sessionId = (0, utils_2.getCallbackIdFromUrl)(callbackUrl);
            const contextMessage = request.contextMessage ? request.contextMessage : request.baseCallbackUrl;
            const contextAddress = request.contextAddress ? request.contextAddress : '0x0';
            const template = {
                id: (0, utils_2.generateUuid)(),
                sessionId,
                name: request.title,
                callbackUrl,
                requestorAddress: request.requestorAddress,
                requestorPublicKey: request.requestorPublicKey,
                claims: request.requestedProofs.map((requestedProof) => {
                    return {
                        templateClaimId: (0, utils_2.generateUuid)(),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        provider: requestedProof.params.provider,
                        payload: requestedProof.params.payload,
                        context: (0, utils_2.encodeContext)({ sessionId, contextMessage, contextAddress }, false),
                    };
                })
            };
            const regexes = request.requestedProofs.map((requestedProof) => {
                return requestedProof.regex;
            });
            return new Template_1.default(template, regexes);
        };
        /**
         * function to verify the witness signatures
         * @param proofs proofs returned by the callback URL
         * @returns {Promise<boolean>} boolean value denotes if the verification was successful or failed
         */
        this.verifyCorrectnessOfProofs = async (expectedSessionId, submittedProofs) => {
            let result = false;
            const proofs = (0, utils_2.transformProofsToverify)(submittedProofs);
            for (const proof of proofs) {
                const witnesses = await (0, utils_2.getWitnessesForClaim)(proof.epoch, proof.identifier, parseInt(proof.timestampS));
                // if no witnesses are present: return false
                if (!witnesses.length) {
                    logger.error('No witnesses found for the claim');
                    return result;
                }
                try {
                    const claim = {
                        claim: {
                            owner: eth_1.ETH_SIGNATURE_PROVIDER.getAddress(Buffer.from(proof.ownerPublicKey, 'hex')),
                            provider: proof.provider,
                            timestampS: parseInt(proof.timestampS),
                            context: proof.context ? proof.context : '',
                            parameters: (0, canonicalize_1.default)(proof.parameters),
                            epoch: proof.epoch,
                            identifier: proof.identifier,
                        },
                        signatures: proof.signatures.map(signature => {
                            return ethers_1.utils.arrayify(signature);
                        })
                    };
                    // for proofs generated directly on the app, the context is empty
                    let encodedCtx = '';
                    if (proof.context) {
                        // first decode ctx
                        const decodedCtx = (0, utils_2.decodeContext)(proof.context);
                        // then encode it again with the expected sessionId
                        encodedCtx = (0, utils_2.encodeContext)({ sessionId: expectedSessionId, contextMessage: decodedCtx.contextMessage, contextAddress: decodedCtx.contextAddress }, true);
                    }
                    // then hash the claim info with the encoded ctx to get the identifier
                    const calculatedIdentifier = (0, witness_sdk_1.getIdentifierFromClaimInfo)({ parameters: (0, canonicalize_1.default)(proof.parameters), provider: proof.provider, context: encodedCtx });
                    // check if the identifier matches the one in the proof
                    if (calculatedIdentifier !== proof.identifier) {
                        logger.error('Identifier mismatch');
                        return result;
                    }
                    // verify the witness signature
                    (0, utils_1.assertValidSignedClaim)(claim, witnesses);
                    result = true;
                    logger.info(`isCorrectProof: ${result}`);
                }
                catch (error) {
                    // if the witness signature is not valid: return false
                    logger.error(`${error}`);
                    result = false;
                }
            }
            return result;
        };
        /**
         * function to get the claimIds from the proofs
         * @param proofs
         * @returns {string}
         */
        this.getClaimIdsFromProofs = (proofs) => {
            const claimIdArray = [];
            for (const proof of proofs) {
                const claimId = proof.identifier;
                claimIdArray.push(claimId);
            }
            return claimIdArray;
        };
    }
    get HttpsProvider() {
        return HttpsProvider_1.HttpsProvider;
    }
    get CustomProvider() {
        return CustomProvider_1.CustomProvider;
    }
}
exports.Reclaim = Reclaim;
