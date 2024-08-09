import { Proof, ProofRequest, SubmittedProof } from '../types';
import { CustomProvider } from './CustomProvider';
import { HttpsProvider } from './HttpsProvider';
import TemplateInstance from './Template';
/** Reclaim class */
export declare class Reclaim {
    get HttpsProvider(): typeof HttpsProvider;
    get CustomProvider(): typeof CustomProvider;
    /**
     * function to request proofs from Reclaim
     * @param request Proof request
     * @returns {TemplateInstance} Template instance
     */
    requestProofs: (request: ProofRequest) => TemplateInstance;
    /**
     * function to verify the witness signatures
     * @param proofs proofs returned by the callback URL
     * @returns {Promise<boolean>} boolean value denotes if the verification was successful or failed
     */
    verifyCorrectnessOfProofs: (expectedSessionId: string, submittedProofs: SubmittedProof[]) => Promise<boolean>;
    /**
     * function to get the claimIds from the proofs
     * @param proofs
     * @returns {string}
     */
    getClaimIdsFromProofs: (proofs: Proof[]) => string[];
}
