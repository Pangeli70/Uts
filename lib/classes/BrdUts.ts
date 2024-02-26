/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418 Extraction to its own module
 * ----------------------------------------------------------------------------
 */

/**
 * Breda Deno Typescript utilities
 */
export class BrdUts {


    /**
     * 90 gradi sessaggesimali in radianti
     */
    static readonly RAD_90 = Math.PI / 2;

    /**
     * 180 gradi sessaggesimali in radianti
     */
    static readonly RAD_180 = Math.PI;

    /**
     * Coefficiente di conversione da angoli sessaggesimali a radianti
     */
    static readonly TO_RAD = 2 * Math.PI / 360;


    /** 
     * Perform a raw deep copy of the nested properties in an object or array using JSON 
     * conversion
     */
    static JsonDeepCopy(aobj: any) {
        return JSON.parse(JSON.stringify(aobj));
    }

    /**
     * Create a high entropy hash value starting from a string
     * Credits https://stackoverflow.com/users/815680/bryc
     */
    static BrycHash(astr: string, aseed = 0) {

        let h1 = 0xdeadbeef ^ aseed;
        let h2 = 0x41c6ce57 ^ aseed;
        for (let i = 0; i < astr.length; i++) {
            const ch = astr.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        const hash = 4294967296 * (2097151 & h2) + (h1 >>> 0);
        return hash;

    }



    /**
     * Returns a random number in a range
     * @param amin minimum value
     * @param amax maximum value
     * @param adecimalFigures number of decimal figures after the dot
     * @remarks if the limits are swapped then are sorted properly 
     */
    static GetRandomInRange(
        amin: number,
        amax: number,
        adecimalFigures = -1
    ) {

        if (amin > amax) {
            const a = amin;
            amin = amax;
            amax = a
        }
        const delta = amax - amin;
        let r = Math.random() * delta + amin;

        if (adecimalFigures != -1) {
            r = this.RoundDecimalFigures(r, adecimalFigures);
        }

        return r;
    }



    /**
     * Rounds a floating point number to the specified number of figures after dot
     */
    static RoundDecimalFigures(anumber: number, afiguresAfterDot: number) {
        const tenPower = 10 ** afiguresAfterDot;
        return (Math.round(anumber * tenPower) / tenPower);
    }



    /**
     * Gets a random value from an enum
     * @param aenum 
     */
    static GetRandomFromEnum<E>(aenum: any) {
        const keys = Object.keys(aenum);
        const index = Math.floor(Math.random() * keys.length);
        const key = keys[index];
        return aenum[key] as E;
    }


    /**
     * Converts an array of objects in a csv representation ready to be stored 
     * on persistent media or delivered to the network. The first row will contain
     * the names of the properties of the object
     * @param aarray of objects simple properties single level non nested
     * @param aseparator optional string (character) to be used as field separator
     * @returns a string of rows separated by crlf characters
     */
    static ArrayToCsv(aarray: Record<string, unknown>[], aseparator = ";") {
        const r: string[] = [];
        const first = aarray[0];
        const keys = Object.keys(first);
        let row = "";
        let i = 0;

        for (const key of keys) {
            if (i > 0) {
                row += aseparator;
            }
            row += key;
            i++;
        }
        r.push(row);

        for (const item of aarray) {
            row = "";
            i = 0;
            for (const key of keys) {
                if (i > 0) {
                    row += aseparator;
                }
                const val = (<any>item)[key];
                if (this.IsDate(val)) {
                    row += val.getDate() + "/" + (val.getMonth() + 1) + "/" + val.getFullYear()
                }
                else if (this.IsNumber(val)) {
                    const stamp = parseFloat(val).toString().replaceAll(".", ",");
                    row += stamp;
                }
                else if (typeof (val) == "string") {
                    row += val;
                }
                else {
                    row += (isNaN(val)) ? "" : val;
                }
                i++;
            }
            r.push(row);
        }
        return r.join("\r\n");
    }


    /**
     * Check if the supplied parameter is a Date
     */
    static IsDate(avalue: any) {
        const r = (avalue && avalue.getMonth && typeof avalue.getMonth == "function");
        return r == true;
    }


    /**
     * Check if the supplied parameter is a number
     */
    static IsNumber(avalue: any) {
        const r = (avalue && typeof avalue === 'number' && isFinite(avalue));
        return r == true;
    }


    /** 
     * Converts a string to a boolean considering potential truthiness for the following cases:
     * astring != undefined &&
     * (
     *   astring.toLowerCase() === "true" || 
     *   astring.toLowerCase() === "ok" || 
     *   astring === "1"
     * )
     */
    static ToBoolean(astring?: string): boolean {
        let r = false;
        if (astring) {
            const lowerCase = astring.toLowerCase();

            if (lowerCase === "true" || lowerCase === "ok" || lowerCase === "1") {
                r = true;
            }
        }
        return r;
    }


    /**
     * Something wrong is going on, so brake volountarily the program and give 
     * an alert message
     * 
     * @param amustBeTrueCondition Must be true
     * @param amessage If the condition is false
     */
    static Assert(
        amustBeTrueCondition: boolean,
        amessage: string
    ) {
        const message = "ASSERTION! " + amessage
        if (!amustBeTrueCondition) {
            alert(message);
            console.log(message);
            throw new Error(message);
        }
    }


    /**
     * Get some Deno memory usage statistics
     */
    static GetMemoryUsageMb() {

        if (Deno) {
            const memoryUsage = Deno.memoryUsage();
            const MB = 1024 * 1024;
            const r = {
                rss: (Math.round(memoryUsage.rss / MB * 100) / 100),
                heapTotal: this.RoundDecimalFigures(memoryUsage.heapTotal / MB, 2),
                heapUsed: this.RoundDecimalFigures(memoryUsage.heapUsed / MB, 2),
                external: this.RoundDecimalFigures(memoryUsage.external / MB, 2),
            };
            return r;
        }
        return {
            message: "This function is Deno only"
        };
    }



    static LogMemory(awhere: string) {
        if (Deno) {
            const megabyte = Math.round((Deno.memoryUsage().rss / 1024 / 1024) * 1000) / 1000;
            console.log(`${awhere}: Current memory usage: ${megabyte}MB`)
        }
        else { 
            console.log("This function is Deno only");
        }
    }



    static ZeroPad(anum: number, aplaces: number) {
        return String(anum).padStart(aplaces, '0')
    }
}

/*! ---------------------------------------------------------------------------
 * @copyright Breda Sistemi industriali S.p.A., 2023 - http://bredasys.com
 * All rights reserved 
 * @licence You cannot host, display, distribute or share this Work in any 
 * form, both physical and digital. You cannot use this Work in any commercial
 * or non-commercial product, website or project. You cannot sell this Work
 * and you cannot mint an NFTs out of it.
 * --------------------------------------------------------------------------- 
 */
