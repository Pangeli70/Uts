/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
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



    /**
     * Get the multilanguage item if found in the dictionary or null
     */
    item(aitem: string) { 

        const item = this._dictionary[aitem];
        
        if (item == undefined) return null;

        return item;

    }



    /**
     * Get the translation of the multilanguage item if found in the dictionary.
     * The method supports placeholderes for additional parameters in the format 
     * [%n] where n is a number starting from 1
     */
    get(
        aitem: string,
        alang: ApgUts_TLanguage,
        aparams?: string[]
    ) {
        const item = this._dictionary[aitem];
        if (item == undefined) {
            return `Error translation for [${aitem}] not found`;
        }

        let r = item[alang];
        if (r == undefined) {
            r = `[${alang}] ` + item['EN'];
        }

        if (aparams) {

            for (let i = 1; i <= aparams.length; i++) {
                r = r.replaceAll(`[%${i}]`, aparams[i-1]);
            }
        }

        return r;
    }



    /**
     * Returns the translation of the entire dictionary in the specified language
     * This method is not compatible with additional parameters. Parameter interpolations
     * must be done afterwards.
     */
    getAll(
        alangId: ApgUts_TLanguage
    ) {

        const r: Record<string, string> = {};

        for (const key in this._dictionary) {
            r[key] = this.get(key, alangId)
        }

        return r;
    }




    /**
     * Get the translation of the passed multilanguage item.
     * The method supports placeholderes for additional parameters in the format 
     * [%n] where n is a number starting from 1
     */
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
