/** ---------------------------------------------------------------------------
 * @module [Brd/Uts]
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418 Extraction to its own module
 * ----------------------------------------------------------------------------
 */

/**
 * Breda Deno Typescript utilities
 */
export class BrdUts {

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
     * Get some Deno memory usage statistics
     */
    static GetMemoryUsageMb() {
        const memoryUsage = Deno.memoryUsage();
        const MB = 1024 * 1024;
        const memoryUsageMb = {
            rss: (Math.round(memoryUsage.rss / MB * 100) / 100),
            heapTotal: this.RoundFigures(memoryUsage.heapTotal / MB, 2),
            heapUsed: this.RoundFigures(memoryUsage.heapUsed / MB, 2),
            external: this.RoundFigures(memoryUsage.external / MB, 2),
        };
        return memoryUsageMb;
    }


    /**
     * Rounds a floating point number to the specified number of figures after dot
     */
    static RoundFigures(anumber: number, afiguresAfterDot: number) {
        const tenPower = 10 ** afiguresAfterDot;
        return (Math.round(anumber * tenPower) / tenPower);
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


    /** Converts a string to a boolean considering potential truthiness for the following cases:
     *  astring != undefined &&
     *  (astring.toLowerCase() === "true" || astring.toLowerCase() === "ok" || astring === "1" )
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

    static Assert(amessage: string) {
        console.log("ASSERT!:" + amessage);
        throw new Error(amessage);
    }


    static LogMemory(awhere: string) {
        const megabyte = Math.round((Deno.memoryUsage().rss / 1024 / 1024) * 1000) / 1000;
        console.log(`${awhere}: Current memory usage: ${megabyte}MB`)
    }

    static ZeroPad(anum: number, aplaces: number) {
        return String(anum).padStart(aplaces, '0')
    }
}
