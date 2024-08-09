"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpsProvider = void 0;
class HttpsProvider {
    constructor(params) {
        // params for the provider
        this._params = {
            provider: 'http',
            payload: {
                metadata: {
                    name: '',
                    logoUrl: ''
                },
                method: 'GET',
                urlType: 'REGEX',
                url: '',
                login: {
                    url: ''
                },
                responseSelections: [{
                        jsonPath: '',
                        xPath: '',
                        responseMatch: ''
                    }],
                useZK: true,
                parameters: {},
            }
        };
        // check if params are of type HttpsProviderParams
        if (!params.name || !params.logoUrl || !params.url || !params.loginUrl || !params.responseSelection) {
            throw new Error('Invalid parameters passed to HttpsProvider');
        }
        // check if user has passed useZK as true or false
        if (params.useZK !== true && params.useZK !== false) {
            throw new Error('Invalid value for useZK');
        }
        // set params
        this._params.payload = {
            ...this._params.payload,
            metadata: {
                name: params.name,
                logoUrl: params.logoUrl
            },
            url: params.url,
            urlType: params.urlType ? params.urlType : 'REGEX',
            headers: params.headers ? params.headers : {},
            method: params.method ? params.method : 'GET',
            login: {
                url: params.loginUrl,
            },
            responseSelections: params.responseSelection,
            parameters: {},
            customInjection: params.customInjection ? params.customInjection : null,
            bodySniff: params.bodySniff ? params.bodySniff : null,
            userAgent: params.userAgent ? params.userAgent : null,
            useZK: params.useZK,
        };
        // set regex
        this._regex = params.responseSelection.map((selection) => {
            return selection.responseMatch;
        });
    }
    // getters
    get params() {
        return this._params;
    }
    get regex() {
        return this._regex;
    }
}
exports.HttpsProvider = HttpsProvider;
