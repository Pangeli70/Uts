/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20230418
 * ----------------------------------------------------------------------------
 */

import { BrdUts_TSignature } from "../types/BrdUts_Types.ts";

/**
 * Result with error handling to avoid exceptions handling
 */
export class BrdUts_Result {

    /** Module where the result was created */
    module: string;

    /** Status of the result */
    ok: boolean;

    /** Error message if status is false */
    message?: string;

    /** Value fr the object carried by the result */
    payload?: unknown;

    /** Signature of the payload's type for quick raw type verification*/
    signature?: BrdUts_TSignature;



    constructor(amodule: string, asignature?: BrdUts_TSignature) { 
        this.ok = true;
        this.module = amodule;
        if (asignature) { 
            this.signature = asignature;
        }
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