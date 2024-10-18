/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240728 Extraction to its own class
 * @version 0.2 APG 20240826 Renaming fields
 * @version 0.3 APG 20240921 loggable events
 * ----------------------------------------------------------------------------
 */

import {
    ApgUts_ILoggableEvent
} from "../interfaces/ApgUts_ILoggableEvent.ts";



/**
 * Base class for all services
 */
export abstract class ApgUts_Service {

    private static _service = "";

    private static _events: ApgUts_ILoggableEvent[] = [];
    static get Events() { return this._events; }



    static get SERVICE() {

        if (this._service == "") {
            this._service = this.InitServiceName();
        }
        return this._service;
    }


    /** (Virtual abstract method)
     * 
     * This is mandatory to be implemented by the child classes and is used for
     * logging and telemetry and to avoid throwing errors.
     */
    protected static InitServiceName(): string {

        throw new Error(`Virtual abstract method ${this.InitServiceName.name} not implemented`);

    }



    /**
     * Deprecated use InitServiceName() instead
     * @param aimportMetaUrl 
     * @returns 
     */
    protected static ModuleFromUrl(aimportMetaUrl: string) {
        return aimportMetaUrl.split('/').pop()!.split('.')[0];
    }



    /**
     * Creates a string with the name of the class and the name of the method
     */
    protected static Method(
        // deno-lint-ignore ban-types
        afunction: Function
    ) {
        return this.SERVICE + "." + afunction.name + "(): ";
    }



    /**
     * The services are long living objects usually singletons.
     * To monitor their status especially during the initialization it is
     * useful to log events for debugging purposes.
     * 
     * @param aevent A standard ApgUts_ILoggableEvent
     */
    protected static LogInternalEvent(
        aevent: ApgUts_ILoggableEvent
    ) {
        this._events.push(aevent);
    }


}