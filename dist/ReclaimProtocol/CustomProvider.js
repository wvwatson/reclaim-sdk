"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomProvider = void 0;
class CustomProvider {
    constructor(params) {
        // check if params are of type ProviderParams
        if (!params.provider || !params.payload) {
            throw new Error('Invalid parameters passed to CustomProvider');
        }
        this._params = params;
    }
    // getters
    get params() {
        return this._params;
    }
    get regex() {
        return [''];
    }
}
exports.CustomProvider = CustomProvider;
