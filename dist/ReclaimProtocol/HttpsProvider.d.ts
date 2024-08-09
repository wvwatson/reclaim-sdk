import { HttpsProviderParams, ProviderParams } from '../types';
export declare class HttpsProvider {
    private _params;
    private _regex;
    constructor(params: HttpsProviderParams);
    get params(): ProviderParams;
    get regex(): string[];
}
