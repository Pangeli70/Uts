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
    private readonly _date: Date;



    constructor(aparam?: Date) {

        if (!aparam) {
            aparam = new Date();
        }
        this._date = aparam;
        this._stamp = this.#value(aparam);

    }



    #value(adate: Date) {
        return adate.getUTCFullYear() + '-' +
            (adate.getUTCMonth() + 1).toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getUTCDate().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getUTCHours().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getUTCMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getUTCSeconds().toLocaleString(undefined, { minimumIntegerDigits: 2 }) + '-' +
            adate.getUTCMilliseconds().toLocaleString(undefined, { minimumIntegerDigits: 3 });
    }



    get Date() {
        return this._date;
    }



    get Stamp() {
        return this._stamp;
    }
}