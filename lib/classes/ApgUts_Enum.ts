/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240728 Extraction to its own class
 * ----------------------------------------------------------------------------
 */


/**
 * Utility class for enumerations
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


}