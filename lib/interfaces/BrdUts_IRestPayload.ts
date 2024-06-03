/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20230418
 * ----------------------------------------------------------------------------
 */

import {
    BrdUts_TSignature
} from "../types/BrdUts_TSignature.ts";



/**
 * Payload per il risultato di una chiamata ad un microservizio REST
 */
export interface BrdUts_IRestPayload {

    signature: BrdUts_TSignature;

    data: unknown;
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