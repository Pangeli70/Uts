/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2023/12/06] 
 * @version 0.9.2 [APG 2024/01/03] Moved to Uts
 * @version 0.9.3 [APG 2024/07/28] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */

import { ApgUts_IRestPayload } from "../interfaces/ApgUts_IRestPayload.ts";




/**
 * Result of a call to a REST microservice
 */
export class ApgUts_RestResult {

    /**
     * Name of the microsevice who has sent the response
     */
    service: string;

    /**
     * Method or verb of the request
     */
    method?: string;

    /**
     * Url of the request
     */
    url?: string;

    /**
     * Status of the request
     */
    ok = true;

    /**
     * Message associated to the response. Could be an error message or an information message.
     */
    message: string = "";

    /**
     * Result of the request
     */
    payload?: ApgUts_IRestPayload;

    /**
     * Date and time of the receivement of the request by the server
     */
    dateTime: string;

    /**
     * Total processing time for the elaboration of the response
     */
    totalTime: number;



    constructor(aserviceName: string) {
        this.service = aserviceName;
        this.dateTime = (new Date()).toISOString();
        this.totalTime = performance.now()
    }



    updateTotalTime() { 
        this.totalTime = performance.now() - this.totalTime;
    }



    fail(amessage: string) { 
        this.ok = false;
        this.message = amessage;
        this.updateTotalTime();
    }

}




