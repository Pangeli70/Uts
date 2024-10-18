/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240826 
 * @version 0.2 APG 20240921 loggable events 
 * ----------------------------------------------------------------------------
 */

import {
    ApgUts_ILoggableEvent
} from "../interfaces/ApgUts_ILoggableEvent.ts";


/**
 * Base class for all classes that need naming and logging capabilities
 */
export abstract class ApgUts_Class {


    /** (Virtual abstract method)
     * Gives the name of the class for debuggin or logging purposes
     */
    protected initClassName(): string {
        throw new Error(`Virtual abstract method ${this.initClassName.name} for child of ${ApgUts_Class.name} is not implemented`);
    }


    private _class = "";

    private _events: ApgUts_ILoggableEvent[] = [];
    get Events() { return this._events; }



    get CLASS() {

        if (this._class == "") {
            this._class = this.initClassName();
        }
        return this._class;
    }


    /**
     * Creates a string with the name of the class and the name of the method
     */
    protected method(
        // deno-lint-ignore ban-types
        afunction: Function
    ) {
        return this.CLASS + "." + afunction.name + "(): ";
    }


    /**
     * Logs an event associated to this class
     */
    protected log(
        aevent: ApgUts_ILoggableEvent
    ) {
        this._events.push(aevent);
    }



    /**
     * Purges the array of the events
     */
    protected purgeLog() {
        this._events = [];
    }


}