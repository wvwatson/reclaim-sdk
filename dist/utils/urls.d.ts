export declare function generateUuid(): string;
export declare function isValidUrl(url: string): boolean;
export declare function generateCallbackUrl(baseUrl: string, callbackId?: string): string;
export declare function getCallbackIdFromUrl(_url: string): string;
export declare function getShortenedUrl(url: string): Promise<any>;
