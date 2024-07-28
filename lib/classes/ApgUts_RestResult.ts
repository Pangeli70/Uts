/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20231206 
 * @version 0.2 APG 20240103 Moved to Uts
 * @version 0.3 APG 20240728 English comments
 * ----------------------------------------------------------------------------
 */

import {
    ApgUts_IRestPayload
} from "../interfaces/ApgUts_IRestPayload.ts";




/**
 * Result of a calla to a REST microservice
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




