/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418 Extraction to its own module
 * ----------------------------------------------------------------------------
 */

/**
 * Breda Deno Typescript utilities
 */
export class ApgUts {



    /**
     * Returns the module name from an import.meta.url 
     */
    static ModuleFromUrl(aImportMetaUrl: string) {

        return aImportMetaUrl.split('/').pop()!.split('.')[0];

    }



    /** 
     * Perform a raw deep copy of the nested properties in an object or array using JSON 
     * conversion
     */
    // deno-lint-ignore no-explicit-any
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
     * Sanitize HTML text converting the characters that could create problems
     */
    static EscapeHTML(ahtml: string) {

        return ahtml
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }


    /** 
     * Replaces invalid characters in urls with correct escape sequences
     */
    static Urlify(apath: string) {
        let r = apath;
        let i = 0;
        const l = r.length;
        do {
            i = r.indexOf('=');
            if (i !== -1) {
                let b = true;
                let j = i;
                do {
                    j++;
                    if (r[j] === '&' || j === l) {
                        r = r.substring(0, i) + r.substring(j, l);
                        b = false;
                    }
                } while (b);
            }
        } while (i !== -1);
        r = r
            .replace(/[\/?&]/g, '_')
            .replace(/[:=]/g, '');
        return r;
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
     * Check if the supplied parameter is a Date
     */
    // deno-lint-ignore no-explicit-any
    static IsDate(avalue: any) {
        const r = (avalue && avalue.getMonth && typeof avalue.getMonth == "function");
        return r == true;
    }


    /**
     * Check if the supplied parameter is a number
     */
    // deno-lint-ignore no-explicit-any
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

