/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/01/03]
 * @version 0.9.2 [APG 2024/07/28] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */

import { ApgUts_IMultilanguage } from "../interfaces/ApgUts_IMultilanguage.ts";
import { ApgUts_TLanguage } from "../types/ApgUts_TLanguage.ts";


/**
 * Utility class to manage translations
 */
export class ApgUts_Translator {


    private _dictionary: Record<string, ApgUts_IMultilanguage>;



    constructor(adictionary: Record<string, ApgUts_IMultilanguage>) {

        this._dictionary = adictionary;
    }



    get(
        aitem: string,
        alang: ApgUts_TLanguage,
        aparams?: string[]
    ) {
        const m = this._dictionary[aitem];
        if (m == undefined) {
            return `Error translation for [${aitem}] not found`;
        }

        let r = m[alang];
        if (r == undefined) {
            r = `[${alang}] ` + m['IT'];
        }

        if (aparams) {

            for (let i = 1; i <= aparams.length; i++) {
                r = r.replaceAll(`[%${i}]`, aparams[i-1]);
            }
        }

        return r;
    }



    getAll(
        alangId: ApgUts_TLanguage
    ) {

        const r: Record<string, string> = {};

        for (const key in this._dictionary) {
            r[key] = this.get(key, alangId)
        }

        return r;
    }



    static Translate(
        aitem: ApgUts_IMultilanguage,
        alang: ApgUts_TLanguage,
        aparams?: string[]
    ) {
    
        let r = aitem[alang];
        if (r == undefined) {
            r = `[${alang}] ` + aitem['EN'];
        }

        if (aparams) {

            for (let i = 1; i <= aparams.length; i++) {  
                r = r.replaceAll(`[%${i}]`, aparams[i-1]);
            }
        }
    
        return r;
    }

}
