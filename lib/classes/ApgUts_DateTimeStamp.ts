/** -----------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220918 
 * -----------------------------------------------------------------------
 */

/**
 * Custom Apg date time stamps. These are meant to be used as immutable identifiers 
 */
export class ApgUts_DateTimeStamp {

    private readonly _stamp: string;

    constructor(aparam: Date) {
        if (typeof aparam == 'string') {
            this._stamp = aparam;
        }
        else {
            this._stamp = this.#value(aparam)
        }
    }

    #value(adate: Date) {
        return adate.getFullYear() + '-' +
            (adate.getMonth() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getDate().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getHours().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 });
    }

    get Date() {
        const splits = this._stamp.split('-');
        const str = `${splits[0]}-${splits[1]}-${splits[2]}T${splits[3]}:${splits[4]}:${splits[5]}`;
        return new Date(str);
    }

    get Stamp() {
        return this._stamp;
    }
}