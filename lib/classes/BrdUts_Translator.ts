import {
    BrdUts_IMultilanguage
} from "../interfaces/BrdUts_IMultilanguage.ts";
import {
    BrdUts_TLanguage
} from "../types/BrdUts_TLanguage.ts";



export class BrdUts_Translator {


    private _dictionary: Record<string, BrdUts_IMultilanguage>;

    constructor(adictionary: Record<string, BrdUts_IMultilanguage>) {

        this._dictionary = adictionary;
    }


    get(
        aitem: string,
        alang: BrdUts_TLanguage
    ) {
        const m = this._dictionary[aitem];
        if (m == undefined) {
            return `Errore traduzione per [${aitem}] non trovata`;
        }

        let r = m[alang];
        if (r == undefined) {
            r = `[${alang}] ` + m['IT'];
        }

        return r;
    }



    getAll(
        alangId: BrdUts_TLanguage
    ) {

        const r: Record<string, string> = {};

        for (const key in this._dictionary) {
            r[key] = this.get(key, alangId)
        }

        return r;
    }

}


export function BrdUts_Translate(
    aitem: BrdUts_IMultilanguage,
    alang: BrdUts_TLanguage
) {

    let r = aitem[alang];
    if (r == undefined) {
        r = `[${alang}] ` + aitem['IT'];
    }

    return r;
}