/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240707 Extracted from ApgEdr_Service
 * @version 0.2 APG 20240826 Renamed and  Removed import meta url for module name
 * @version 0.3 APG 20241107 From function to function.name
 * ----------------------------------------------------------------------------
 */

import {ApgUts_eEventType} from "../enums/ApgUts_eEventType.ts";
import {ApgUts_ILoggableEvent} from "../interfaces/ApgUts_ILoggableEvent.ts";



/**
 * Event Factory
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