import { SignedClaim } from '@reclaimprotocol/witness-sdk';
/** recovers the addresses of those that signed the claim */
export declare function recoverSignersOfSignedClaim({ claim, signatures }: SignedClaim): string[];
/**
 * Asserts that the claim is signed by the expected witnesses
 * @param claim
 * @param expectedWitnessAddresses
 */
export declare function assertValidSignedClaim(claim: SignedClaim, expectedWitnessAddresses: string[]): void;
