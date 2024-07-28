/** ---------------------------------------------------------------------------
 * @module [ApgUrs_Log]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240707 Extracted from ApgEdr_Service
 * ----------------------------------------------------------------------------
 */

import { Uts } from "../../mod.ts";
import {
    ApgUts_eLogType
} from "../enums/ApgUts_eLogType.ts";
import {
    ApgUts_ILogEvent
} from "../interfaces/ApgUts_ILogEvent.ts";



/**
 * Service that is a Log Event Factory
 */
export class ApgUts_LogService {


    static Log(
        atype: ApgUts_eLogType,
        aimportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {

        const module = Uts.ApgUts.ModuleFromUrl(aimportMetaUrl);

        const r: ApgUts_ILogEvent = {
            created: new Date(),
            time: performance.now(),
            type: atype,
            module,
            function: afunction,
            message: amessage
        }

        return r;
    }


    static LogInfo(
        aimportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {
        return this.Log(ApgUts_eLogType.INFO, aimportMetaUrl, afunction, amessage);
    }


    static LogError(
        aimportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {
        return this.Log(ApgUts_eLogType.ERROR, aimportMetaUrl, afunction, amessage);
    }


    static LogDebug(
        aimportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {
        return this.Log(ApgUts_eLogType.DEBUG, aimportMetaUrl, afunction, amessage);
    }


}