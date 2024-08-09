import { Options, Template } from '../types';
/** Template instance */
export default class TemplateInstance {
    /**
   * Property template
   * @type {Template}
   */
    private _template;
    /**
   * Property regexes: base64 encoded regexes
   * @type {string}
   */
    private _regexes;
    /**
   * Constructor
   * @param {Template} template
   */
    constructor(template: Template, regexes: string[][]);
    /**
   * Getter template
   * @return {Template}
   */
    get template(): Template;
    /**
   * Getter id
   * @return {string}
   */
    get id(): string;
    /**
   * Getter callbackId
   * @return {string}
   */
    get callbackId(): string;
    /**
   * Getter regexes: base64 encoded regexes
   * @return {string}
   */
    get expectedProofsInCallback(): string;
    /**
   * function to get the reclaim url
   * @return {string}
   */
    getReclaimUrl: ({ shortened }?: Options) => Promise<string>;
    /**
     * function to get the reclaim handshake url
     * @return {string}
     */
    getReclaimHandshakeUrl: ({ shortened }?: Options) => Promise<string>;
}
