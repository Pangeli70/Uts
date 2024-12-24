/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/07/04]
 * @version 0.9.2 [APG 2024/07/28] English comments
 * @version 0.9.3 [APG 2024/08/26] Renamed
 * @version 0.9.4 [APG 2024/11/07] function to method renaming
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */

import { ApgUts_eEventType } from "../enums/ApgUts_eEventType.ts";



/**
 * Definitions of a loggable event. It can be used for debugging and telemetry
 */
export interface ApgUts_ILoggableEvent {

    /**
     * Date and time of the event creation
     */
    created: Date;

    /**
     * Time of the server when the event was created gathered using Performance.now()
     */
    time: number;

    /**
     * Type of the event
     */
    type: ApgUts_eEventType;

    /** 
     * Name of the class or file in which the event was logged.
     * It can be extracted extracted using the import.meta.url
     */
    module: string;

    /**
     * Method or function in which the event was logged.
     */
    method: string;

    /** 
     * Message associated to the event
     */
    message: string;
}



