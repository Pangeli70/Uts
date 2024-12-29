/** -----------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/18]
 * @version 0.9.2 [APG 2024/11/07] GetNow
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
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



    static GetNow(asuffix?: number) {
        return new ApgUts_DateTimeStamp().Stamp + (asuffix ? "-" + asuffix.toString() : '');
    }
}