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
 * @version 0.9.6 [APG 2023/04/10] Deg to rad ad vice versa + Degrees Functions
 * @version 1.0.0 [APG 2024/09/21] Moving to Deno 2
 * -----------------------------------------------------------------------
 */

import { ApgUts_Is } from "./ApgUts_Is.ts";



/** 
 * Static general purpose math utility functions
 */
export class ApgUts_Math {

    static readonly EPSILON = 0.000001;
    static readonly TO_RAD = Math.PI / 180;



    static SafeInteger(aintegerCandidate: string) {

        if (aintegerCandidate && ApgUts_Is.IsInteger(aintegerCandidate)) {
            return parseInt(aintegerCandidate, 10);
        }
        else {
            return undefined;
        }

    }



    /**
     * Returns a random number in a range properly rounded
     * @param amin minimum value
     * @param amax maximum value
     * @param afigures number figures. -1 is default and means no rounding
     * @remarks if the limits are swapped then are sorted properly 
     */
    static GetRandomInRange(
        amin: number,
        amax: number,
        afigures = -1
    ) {
        // if the limits are swapped then we change properly
        if (amin > amax) {
            const a = amin;
            amin = amax;
            amax = a
        }
        const delta = amax - amin;
        let r = Math.random() * delta + amin;

        if (afigures != -1) {
            r = this.RoundToSignificant(r, afigures);
        }

        return r;
    }



    static RoundToSignificant(an: number, adigits = 5): number {
        const exponentialNotation = an.toExponential(adigits - 1);
        let r = parseFloat(exponentialNotation);
        const abs = Math.abs(r);
        if (abs < this.EPSILON) r = 0;
        return r;
    }



    /**
     * @param   type   The type of adjustment (round, floor, ceil).
     * @param   avalue The number.
     * @param   aexp   The base 10 logarithm of the adjustment base).
     * @returns        The adjusted value.
     */
    static #decimalAdjust(atype: string, avalue: number, aexp?: number) {

        // Typescript hack
        const fun =
            (atype === "round") ? "round" :
                (atype === "floor") ? "floor" :
                    (atype === "ceil") ? "ceil" : undefined;

        if (!fun || isNaN(avalue)) {
            return NaN;
        }

        // If the exp is undefined or zero adjusts to the integer...
        if (!aexp || +aexp === 0) {
            return Math[fun](avalue);
        }

        // If the value is not a number or the exp is not an integer...
        if (!(typeof aexp === 'number' && aexp % 1 === 0)) {
            return NaN;
        }

        const shift = 10 ** aexp;
        let number = avalue / shift;
        number = Math[fun](number);
        number = number * shift;

        return number;
    }



    static Round(value: number, aexp = 0) {
        return this.#decimalAdjust('round', value, aexp);
    }



    static Floor(value: number, aexp = 0) {
        return this.#decimalAdjust('floor', value, aexp);
    }



    static Ceil(value: number, aexp = 0) {
        return this.#decimalAdjust('ceil', value, aexp);
    }



    static RadToDeg(arad: number) {
        return arad / this.TO_RAD;
    }



    static DegToRad(adeg: number) {
        return adeg * this.TO_RAD;
    }



    static DegSin(aangle: number) {
        return Math.sin(aangle * this.TO_RAD);
    }



    static DegArcSin(aheight: number) {
        return Math.asin(aheight) / this.TO_RAD;
    }



    static DegCos(aangle: number) {
        return Math.cos(aangle * this.TO_RAD);
    }



    static DegArcCos(awidth: number) {
        return Math.acos(awidth) / this.TO_RAD;
    }



    static DegTan(aangle: number) {
        return Math.cos(aangle * this.TO_RAD);
    }



    static DegArcTan(aheight: number) {
        return Math.atan(aheight) / this.TO_RAD;
    }
}

