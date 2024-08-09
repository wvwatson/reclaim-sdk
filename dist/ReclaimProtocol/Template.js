"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const utils_1 = require("../utils");
/** Template instance */
class TemplateInstance {
    /**
   * Constructor
   * @param {Template} template
   */
    constructor(template, regexes) {
        /**
       * function to get the reclaim url
       * @return {string}
       */
        this.getReclaimUrl = async ({ shortened = true } = { shortened: true }) => {
            if (!shortened) {
                return (config_1.RECLAIM_APP_URL + encodeURIComponent(JSON.stringify(this._template)));
            }
            const url = await (0, utils_1.getShortenedUrl)(config_1.RECLAIM_APP_URL + encodeURIComponent(JSON.stringify(this._template)));
            return url;
        };
        /**
         * function to get the reclaim handshake url
         * @return {string}
         */
        this.getReclaimHandshakeUrl = async ({ shortened = true } = { shortened: true }) => {
            if (!shortened) {
                return (config_1.RECLAIM_HANDSHAKE_URL + encodeURIComponent(JSON.stringify(this._template)));
            }
            const url = await (0, utils_1.getShortenedUrl)(config_1.RECLAIM_HANDSHAKE_URL + encodeURIComponent(JSON.stringify(this._template)));
            return url;
        };
        this._template = template;
        this._regexes = (0, utils_1.encodeBase64)(regexes);
    }
    /**
   * Getter template
   * @return {Template}
   */
    get template() {
        return this._template;
    }
    /**
   * Getter id
   * @return {string}
   */
    get id() {
        return this._template.id;
    }
    /**
   * Getter callbackId
   * @return {string}
   */
    get callbackId() {
        return (0, utils_1.getCallbackIdFromUrl)(this._template.callbackUrl);
    }
    /**
   * Getter regexes: base64 encoded regexes
   * @return {string}
   */
    get expectedProofsInCallback() {
        return this._regexes;
    }
}
exports.default = TemplateInstance;
