import { SubmittedProof } from '../types';
export declare function getProofsFromRequestBody(requestBody: string): SubmittedProof[];
export declare function transformProofsToverify(proofs: SubmittedProof[]): ({
    parameters: any;
    ownerPublicKey: string;
    timestampS: string;
    witnessAddresses: string[];
    signatures: string[];
    redactedParameters: string;
    epoch: number;
    identifier: string;
    extractedParameterValues?: {
        [key: string]: string | number;
    } | undefined;
    templateClaimId: string;
    context: string;
    provider: "google-login" | "yc-login" | "github-commits" | "github-issues" | "github-pull-requests" | "outlook-login" | "codeforces-rating" | "dunzo-last-order" | "tinder-match-count" | "mastodon-user" | "spotify-premium" | "spotify-account-type" | "spotify-username" | "spotify-email" | "tumblr-follower" | "swiggy-total-count" | "wikipedia-user" | "facebook-friends-count" | "binance-asset-balance" | "ebay-user" | "flickr-user" | "instagram-user" | "blind-user" | "chess-user" | "codechef-rating" | "bybit-balance" | "groww-stock-balance" | "devfolio-hackathon-count" | "quora-user" | "medium-followers-count" | "lichess-username" | "proton-mail" | "soundcloud-username" | "letterboxd-user" | "uidai-aadhar" | "uidai-dob" | "uidai-address" | "twitter-followers-count" | "twitter-username" | "kaggle-username" | "uber-rides" | "http";
} | {
    parameters: any;
    ownerPublicKey: string;
    timestampS: string;
    witnessAddresses: string[];
    signatures: string[];
    redactedParameters: string;
    epoch: number;
    identifier: string;
    extractedParameterValues?: {
        [key: string]: string | number;
    } | undefined;
    templateClaimId: string;
    context: string;
    provider: "google-login" | "yc-login" | "github-commits" | "github-issues" | "github-pull-requests" | "outlook-login" | "codeforces-rating" | "dunzo-last-order" | "tinder-match-count" | "mastodon-user" | "spotify-premium" | "spotify-account-type" | "spotify-username" | "spotify-email" | "tumblr-follower" | "swiggy-total-count" | "wikipedia-user" | "facebook-friends-count" | "binance-asset-balance" | "ebay-user" | "flickr-user" | "instagram-user" | "blind-user" | "chess-user" | "codechef-rating" | "bybit-balance" | "groww-stock-balance" | "devfolio-hackathon-count" | "quora-user" | "medium-followers-count" | "lichess-username" | "proton-mail" | "soundcloud-username" | "letterboxd-user" | "uidai-aadhar" | "uidai-dob" | "uidai-address" | "twitter-followers-count" | "twitter-username" | "kaggle-username" | "uber-rides" | "http";
})[];
