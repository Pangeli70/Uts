/** -----------------------------------------------------------------------
 * @module [apg-uts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.7.1 [APG 2019/08/27]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * @version 0.8.1 [APG 2022/05/01] Refactoring names
 * @version 0.9.0 [APG 2022/09/10] Split in several module + Escape Html
 * @version 0.9.1 [APG 2022/09/11] Github Beta
 * @version 0.9.7 [APG 2023/05/06] Separation of concerns lib/src + Is Deploy
 * @version 1.0.0 [APG 2024/09/21] Deno 2
 * -----------------------------------------------------------------------
 */


/**
 * Utility functions to check if some conditions are met
 */
export class ApgUts_Is {

    
    static IsNumber(an: any): boolean {
        return (!isNaN(parseFloat(an)) && isFinite(an));
    }



    static IsInteger(an: any): boolean {

        let r = this.IsNumber(an);

        if (r) {
            const n = parseFloat(an);
            if (!Number.isInteger(n)) {
                r = false;
            }
        }

        return r;
    }



    static IsDigitChar(acharCode: number): boolean {
        return (acharCode >= "0".charCodeAt(0) && acharCode <= "9".charCodeAt(0));
    }



    static IsTrueish(avalue?: string) {

        if (!avalue)
            return false;

        const value = avalue.trim().toLowerCase();

        switch (value) {
            case "true":
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }



    static IsNumeric(an: string) {
        const isNumber: boolean = /^-?[\d.]+(?:e-?\d+)?$/.test(an);
        if (!isNumber) {
            return false;
        } else {
            return this.IsNumber(an);
        }
    }


    static IsNotUndefOrNull(a: unknown) {
        if (a === undefined) return false;
        if (a === null) return false;
        return true;
    }


    static IsNotEmptyString(a: string) {
        if (a !== "") return true;
        return false;
    }


    static IsDeploy() {
        return Deno.env.get('DENO_DEPLOYMENT_ID') != undefined;
    }


}
