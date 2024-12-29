/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/07] Extracted from ApgEdr_Service
 * @version 0.9.2 [APG 2024/08/26] Renamed and  Removed import meta url for module name
 * @version 0.9.3 [APG 2024/11/07] From function to function.name
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */

import { ApgUts_eEventType } from "../enums/ApgUts_eEventType.ts";
import { ApgUts_ILoggableEvent } from "../interfaces/ApgUts_ILoggableEvent.ts";



/**
 * Static Event Factory with shortcuts to create ApgUts_ILoggableEvent
 */
export class ApgUts_EventFactory {


    static New(
        atype: ApgUts_eEventType,
        aclassName: string,
        afunction: string,
        amessage: string
    ) {


        const r: ApgUts_ILoggableEvent = {
            created: new Date(),
            time: performance.now(),
            type: atype,
            module: aclassName,
            method: afunction,
            message: amessage
        }

        return r;
    }


    static Info(
        aclassName: string,
        afunction: string,
        amessage: string
    ) {
        return this.New(ApgUts_eEventType.INFO, aclassName, afunction, amessage);
    }


    static Error(
        aclassName: string,
        afunction: string,
        amessage: string
    ) {
        return this.New(ApgUts_eEventType.ERROR, aclassName, afunction, amessage);
    }


    static Debug(
        aclassName: string,
        afunction: string,
        amessage: string
    ) {
        return this.New(ApgUts_eEventType.DEBUG, aclassName, afunction, amessage);
    }


}