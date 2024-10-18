/** -----------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.2.0 [APG 2018/06/02]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.7.1 [APG 2019/08/27]
 * @version 0.8.0 [APG 2022/03/12] Porting to Deno
 * @version 0.8.1 [APG 2022/05/01] Refactoring names
 * @version 0.9.0 [APG 2022/09/10] Split in several module + Escape Html
 * @version 0.9.1 [APG 2022/09/11] Github Beta
 * @version 0.1 APG 20240921 Integration in Deno 2
 * -----------------------------------------------------------------------
 */
import { ApgUts_Math } from "./ApgUts_Math.ts";

/**
 * Utility functions to deal with objects
 */
export class ApgUts_Object {


    static TypeOf(aunknown: unknown): string {
        if (aunknown === undefined) {
            return 'undefined';
        }
        if (aunknown === null) {
            return 'null';
        }
        if (Array.isArray(aunknown)) {
            return 'array';
        }
        return typeof aunknown;
    }



    static DeepCopy(aobj: any): any {
        return JSON.parse(JSON.stringify(aobj));
    }



    static DeepFreeze(aobject: any, alevel = 0): any {

        const deepCopy = (alevel == 0) ? this.DeepCopy(aobject) : aobject;
        alevel++;

        if (Array.isArray(deepCopy)) {
            for (let i = 0; i < deepCopy.length; i++) {
                if (deepCopy[i] && typeof deepCopy[i] === "object") {
                    deepCopy[i] = this.DeepFreeze(deepCopy[i], alevel);
                }
            }
        }
        else if (typeof deepCopy === "object") {
            // Retrieve the property names defined on object
            const propNames = Object.keys(deepCopy);

            // Freeze properties before freezing self
            for (const name of propNames) {
                const value = deepCopy[name];

                if (value && typeof value === "object") {
                    deepCopy[name] = this.DeepFreeze(value, alevel);
                }
            }
        }

        return Object.freeze(deepCopy);
    }



    static DeepCopyTo(asrc: any, adest: any): void {
        const temp = JSON.parse(JSON.stringify(asrc));
        Object.keys(temp).forEach(k => {
            adest[k] = temp[k];
        });
    }


    /**
     * Compares two objects deeply and returns true if they are the same
     * The properties can be in different order
     */
    static DeepCompare(a: any, b: any): boolean {
        let r = true;

        const typeOfA = this.TypeOf(a);
        const typeOfB = this.TypeOf(b);
        // if types are different
        if (typeOfA !== typeOfB) return false;

        // if first is array
        if (typeOfA == 'array') {

            if (a.length !== b.length) return false;

            for (let i = 0; i < a.length; i++) {

                const typeOfA = this.TypeOf(a[i]);
                const typeOfB = this.TypeOf(b[i]);
                // if type of each item don't match
                if (typeOfA !== typeOfB) return false;

                // recurse
                if (typeOfA === 'object' || typeOfA === 'array') {
                    r = this.DeepCompare(a[i], b[i]);
                }
                // numbers need further comparison due to floating point artifacts
                if (typeOfA == 'number') {
                    const delta = a[i] - b[i];
                    r = Math.abs(delta) < ApgUts_Math.EPSILON;
                }
                else {
                    r = a[i] === b[i];
                }
                if (!r) return false;
            }
        }
        // if first is object
        else if (typeOfA === 'object') {

            const keysOfA = Object.keys(a);
            const keysOfB = Object.keys(b);

            // if number of keys are different
            if (keysOfA.length != keysOfB.length) return false;

            for (const key of keysOfA) {

                // if keys don't match
                if (!b[key]) return false;

                const typeOfA = this.TypeOf(a[key]);
                const typeOfB = this.TypeOf(b[key]);

                // if types are different
                if (typeOfA !== typeOfB) return false;

                // recurse
                if (typeOfA === 'object' || typeOfA === 'array') {
                    r = this.DeepCompare(a[key], b[key]);
                    if (!r) return false;
                }
                else {
                    const valA = a[key];
                    const valB = b[key];
                    // numbers need further comparison due to floating point artifacts
                    if (typeOfA == 'number') {
                        const delta = valA - valB;
                        r = Math.abs(delta) < ApgUts_Math.EPSILON;
                    }
                    else {
                        r = valA === valB;
                    }
                    if (!r) return false;
                }
            }

        }
        // if first is number we need further comparison due to floating point artifacts
        else if (typeOfA == 'number') {
            const delta = a - b;
            r = Math.abs(delta) < ApgUts_Math.EPSILON;
        }
        else {
            r = a === b;
        }

        return r;
    }



    /**
     * Access to the inner properties of an object using an indirect string notation.
     * Array elements can be accessed using the [] notation
     * @param aobj Object to scan
     * @param apath Chain of properties to follow to get indirectly to the nested property
     * @returns The value of the nested property
     * @example
     * ``` TS
     * const testObj = { prop1: { prop2: [1,2,3] } };
     * 
     * // The path can be in a string with properties chained with dots 
     * const path1 = `prop1.prop2[1]`
     * let val = obj.Indirect(testObj, path1);
     * 
     * // or an array of strings. 
     * const path2 = [`prop1`,`prop2[1]`]
     * val = obj.Indirect(testObj, path2);
     * ```
     */
    static Indirect(
        aobj: any,
        apath: string | string[]
    ) {

        let nodes: string[] = [];
        if (!Array.isArray(apath)) {
            nodes = apath.split(".");
        }
        else {
            nodes = apath;
        }


        let obj = aobj;
        let nodeObj: any;
        const arrayLikeRegex = /\w+\[\d+\]/;

        for (let i = 0; i < nodes.length; i++) {

            if (typeof obj !== 'object') {
                return undefined;
            }

            const propName = nodes[i];
            const matched = propName.match(arrayLikeRegex)
            if (matched) {
                const chunks = propName.split("[");
                const prop = chunks[0];
                if (Array.isArray(obj[prop])) {
                    const num = chunks[1].substring(0, chunks[1].length - 1);
                    const index = parseInt(num);
                    nodeObj = obj[prop][index]
                }
                else {
                    return undefined;
                }
            }
            else {
                nodeObj = obj[propName];
            }

            if (nodeObj === undefined) {
                return undefined;
            }

            obj = nodeObj;
        }

        return obj;
    }

}
