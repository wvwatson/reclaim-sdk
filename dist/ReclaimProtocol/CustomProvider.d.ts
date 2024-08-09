import { ProviderParams } from '../types';
export declare class CustomProvider {
    private _params;
    constructor(params: ProviderParams);
    get params(): ProviderParams;
    get regex(): string[];
}
