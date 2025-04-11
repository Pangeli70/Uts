/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/18] Extraction to its own module
 * @version 1.0.0 [APG 2024/08/14] IsDenoDeploy
 * @version 1.0.1 [APG 2024/11/07] Moved some is... methods and renamed assert to panicIf, new virtual abstract method catcher
 * @version 1.0.2 [APG 2025/01/02] Debugging PanicIf
 * ----------------------------------------------------------------------------
 */

/**
 *  Static Deno-related utility functions
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
     * conversion. Use ApgUts_Object to do an object deep copy
     */
    // deno-lint-ignore no-explicit-any
    static JsonDeepCopy(aobj: any) {
        return JSON.parse(JSON.stringify(aobj));
    }



    /**
     * Perform a raw deep compare of the nested properties in an object or array using 
     * JSON stringify conversion. Use ApgUts_Object to do an object deep comparison
     */
    // deno-lint-ignore no-explicit-any
    static JsonDeepCompare(aobj1: any, aobj2: any) {
        return JSON.stringify(aobj1) === JSON.stringify(aobj2);
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
     * Check if we are running in Deno
     */
    static isDeno() {

        return (Deno !== undefined && Deno.version !== undefined);
        
    }



    /**
     * Something really wrong is going on, so we break volountarily the program.
     * In Deno we print the message and terminate the execution.
     * In the browser we display an alert message and throw an error
     * 
     * @param acondition if true breaks the program
     * @param amessage Error message
     */
    static PanicIf(
        acondition: boolean,
        amessage: string
    ) {
        if (acondition) {
            const message = "PANIC! " + amessage
            if (this.isDeno()) {
                console.log(message);
                Deno.exit(1);
            }
            else {
                alert(message);
                throw new Error(message);
            }
        }
    }



    /**
     * Use this method to break the program if the current method has to be overridden
     * by a derived class
     * 
     * @param aclass Class that contains the method
     * @param amethod Method that has to be overridden
     */
    static CalledVirtualAbstractSoExit(
        aclass: string,
        amethod: string,
    ) {
        const message = `THIS IS A VIRTUAL ABSTRACT METHOD! If you want to call [${aclass}.${amethod}] method you must override the implementation.`
        if (this.isDeno()) {
            console.log(message);
            Deno.exit(1);
        }
        else {
            alert(message);
            throw new Error(message);
        }

    }



    /**
     * Rounds a floating point number to the specified number of figures after dot
     */
    static RoundDecimalFigures(anumber: number, afiguresAfterDot: number) {
        const tenPower = 10 ** afiguresAfterDot;
        return (Math.round(anumber * tenPower) / tenPower);
    }



    /**
     * Get some Deno memory usage statistics
     */
    static GetMemoryUsageMb() {
        const r = {
            rss: 0,
            heapTotal: 0,
            heapUsed: 0,
            external: 0,
        };
        if (Deno) {
            const memoryUsage = Deno.memoryUsage();
            const MB = 1024 * 1024;

            r.rss = (Math.round(memoryUsage.rss / MB * 100) / 100);
            r.heapTotal = this.RoundDecimalFigures(memoryUsage.heapTotal / MB, 2);
            r.heapUsed = this.RoundDecimalFigures(memoryUsage.heapUsed / MB, 2);
            r.external = this.RoundDecimalFigures(memoryUsage.external / MB, 2);

        }

        return r;

    }



    /**
     * Convert a number to a zero padded string
     * 
     * @param anum Number to be converted
     * @param aplaces Number of places to pad
     */
    static ZeroPad(anum: number, aplaces: number) {
        return String(anum).padStart(aplaces, '0')
    }

}

