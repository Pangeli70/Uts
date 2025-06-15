/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/28] Extraction to its own class
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */


/**
 * Static functions for dealing with enumerations
 */
export class ApgUts_Enum { 


    /**
     * Returns a random value from an enumeration
     */
    static GetRandom<E>(
        aenum: any
    ) {

        const keys = Object.keys(aenum);
        const index = Math.floor(Math.random() * keys.length);
        const key = keys[index];

        return aenum[key] as E;

    }



    /**
     * Returns all the values of an enumeration as an array
     */
    static GetAsArray<E>(
        aenum: any
    ) {

        const r: E[] = [];

        const keys = Object.keys(aenum);
        for (const key of keys) {
            r.push(aenum[key] as E);
        }

        return r;
    }



    /**
     * Verifies if the passed value is contained in the enumeration
     * @param aenum The enumeration
     * @param avalue Te value
     * @returns True if the value is contained
     */
    static DoesEnumStringContains(
        aenum: any,
        avalue: string
    ): boolean {

        return (Object.values(aenum).includes(avalue));

    }


    /**
     * Gets an enum key name by its value
     */
    static KeyNameByKeyValue(
        aenum: any,
        avalue: keyof typeof aenum
    ) {
        const r = Object.keys(aenum).find(key => aenum[key as keyof typeof aenum] === avalue)!;

        return r;
    }

}