/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20230418
 * @version 0.2 APG 20240225 Rafactored
 * ----------------------------------------------------------------------------
 */

import { BrdUts_TSignature } from "../types/BrdUts_Types.ts";

/**
 * Result with error handling to avoid exceptions handling
 */
export class BrdUts_Result {


    /** Status of the result */
    ok = true;

    /** Warnings, notifications and Error messages if status is false */
    private _messages: string[] = [];

    /** Value for the object carried by the result */
    private _payload?: unknown;
    get payload() { return this._payload; }

    /** Signature of the payload's type for quick raw type verification*/
    private _signature?: BrdUts_TSignature;
    get signature() { return this._signature; }




    setPayload(
        apayload: unknown,
        asignature: BrdUts_TSignature
    ) {

        this._payload = apayload;
        this._signature = asignature;

    }



    addMessage(
        amethod: string,
        amessage: string
    ) {
        this._messages.push(`${amethod}:${amessage}`);
    }



    getMessages(
        ajoinString = "/n"
    ) {
        return this._messages.join(ajoinString);
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