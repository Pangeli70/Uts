/** ---------------------------------------------------------------------------
 * @module [BrdUrs_Log]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240707 Extracted from BrdEdr_Service
 * ----------------------------------------------------------------------------
 */

import { BrdUts_eLogType } from "../enums/BrdUts_eLogType.ts";
import { BrdUts_ILogEvent } from "../interfaces/BrdUts_ILogEvent.ts";



/**
 * Servizio per gestire la Creazione degli eventi
 */
export class BrdUts_LogService {


    /** Registra un evento  */
    static Log(
        atype: BrdUts_eLogType,
        aImportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {

        const module = aImportMetaUrl.split('/').pop()!.split('.')[0];

        const r: BrdUts_ILogEvent = {
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
        aurl: string,
        afunction: Function,
        amessage: string
    ) {
        return this.Log(BrdUts_eLogType.INFO, aurl, afunction, amessage);
    }


    static LogError(
        aurl: string,
        afunction: Function,
        amessage: string
    ) {
        return  this.Log(BrdUts_eLogType.ERROR, aurl, afunction, amessage);
    }


    static LogDebug(
        aurl: string,
        afunction: Function,
        amessage: string
    ) {
        return  this.Log(BrdUts_eLogType.DEBUG, aurl, afunction, amessage);
    }


}