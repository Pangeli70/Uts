/** -----------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 20180602]
 * @version 0.5.0 [APG 20181125]
 * @version 0.7.1 [APG 20190827]
 * @version 0.8.0 [APG 20220312] Porting to Deno
 * @version 0.8.1 [APG 20220501] Refactoring names
 * @version 0.9.0 [APG 20220910] Split in several module + Escape Html
 * @version 0.9.1 [APG 20220911] Github Beta
 * @version 0.9.7 [APG 20230506] Separation of concerns libsrc + Is Deploy
 * @version 1.0.0 [APG 20240921] Moving to Deno 2
 * @version 1.1.0 [APG 20241107] Moved here IsDate
 * @version 1.1.1 [APG 20241117] Is Email
 * -----------------------------------------------------------------------
 */


/**
 * Static utility functions to check if some conditions are met
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


    
    /**
     * Check if the supplied parameter is a Date
     */
    // deno-lint-ignore no-explicit-any
    static IsDate(avalue: any) {

        const r = (avalue && avalue.getMonth && typeof avalue.getMonth == "function");
        return r == true;

    }


    /**
     * Checks if the email is valid in the most common scenarios
     */
    static IsEmailAddress(aemail: string) {
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(aemail);

    }

}
