/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * @version 0.2 APG 20240728 English comments
 * @version 0.3 APG 20240826 Renamed
 * @version 0.4 APG 20241107 function to method renaming
 * ----------------------------------------------------------------------------
 */

import {ApgUts_eEventType} from "../enums/ApgUts_eEventType.ts";



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



