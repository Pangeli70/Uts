/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240826 
 * @version 0.2 APG 20240921 loggable events
 * @version 0.3 APG 20241102 cleanup and alignment with ApgUts_Service
 * ----------------------------------------------------------------------------
 */



import {
    ApgUts_eEventType
} from "../enums/ApgUts_eEventType.ts";
import {
    ApgUts_ILoggableEvent
} from "../interfaces/ApgUts_ILoggableEvent.ts";
import {
    ApgUts
} from "../statics/ApgUts.ts";
import {
    ApgUts_EventFactory
} from "../statics/ApgUts_EventFactory.ts";
import {
    ApgUts_Result
} from "./ApgUts_Result.ts";



/**
 * Base class for all classes that need naming and logging capabilities
 */
export abstract class ApgUts_Class {

    private _class = "";
    get NAME() {
        if (this._class == "") {
            this._class = this.initClassName();
        }
        return this._class;
    }

    private _events: ApgUts_ILoggableEvent[] = [];
    get Events() { return this._events; }


    constructor() {
        this.initClassName();
    }



    /** (Virtual abstract method)
     * Gives the name of the class for debuggin or logging purposes
     */
    protected initClassName(): string {

        ApgUts.CalledVirtualAbstractSoExit(ApgUts_Class.name, this.initClassName.name);
        return "";

    }



    /**
     * Creates a string with the name of the class and the name of the method
     */
    protected method(
        // deno-lint-ignore ban-types
        amethod: Function
    ) {
        return this.NAME + "." + amethod.name + "(): ";
    }



    /**
     * Logs the error event and stores the error message in the result argument
     * Returns the result argument so we can return using this method
     */
    protected error(
        aresult: ApgUts_Result<any>,
        amethod: string,
        amessage: string
    ) {
        this.logError(amethod, amessage)
        return aresult.error(amethod, amessage);
    }



    /**
     * Logs an event associated to this class
     */
    protected logEvent(
        aevent: ApgUts_ILoggableEvent
    ) {
        this._events.push(aevent);
    }



    /**
     * Creates and logs an event
     */
    protected log(
        atype: ApgUts_eEventType,
        amethod: string,
        amessage: string
    ) {

        const event = ApgUts_EventFactory.New(
            atype, this.NAME, amethod, amessage
        );
        this._events.push(event);
    }



    /**
     * Creates and logs an info event
     */
    protected logInfo(amethod: string, amessage: string) {

        const event = ApgUts_EventFactory.Info(this.NAME, amethod, amessage);
        this._events.push(event);

    }


    /**
     * Creates and logs a performance event at the beginning of the method
     * @returns The method name
     */
    protected logBegin(
        // deno-lint-ignore ban-types
        amethod: Function,
        amessage = ""
    ) {

        const event = ApgUts_EventFactory.New(
            ApgUts_eEventType.PERF, this.NAME, amethod.name, 'Begin... ' + amessage
        );
        this._events.push(event);

        return event;

    }



    /**
     * Creates and logs a performance event at the end of the method
     */
    protected logEnd(
        abeginEvent: ApgUts_ILoggableEvent
    ) {
        const delta = (performance.now() - abeginEvent.time).toFixed(2);
        const event = ApgUts_EventFactory.New(
            ApgUts_eEventType.PERF, this.NAME, abeginEvent.method, `... End [${delta}]ms`
        );
        this._events.push(event);

    }




    /**
     * Creates and logs an error event
     */
    protected logError(amethod: string, amessage: string) {

        const event = ApgUts_EventFactory.Error(this.NAME, amethod, amessage);
        this._events.push(event);

    }



    /**
     * Creates and logs a debug event
     */
    protected logDebug(amethod: string, amessage: string) {

        const event = ApgUts_EventFactory.Debug(this.NAME, amethod, amessage);
        this._events.push(event);

    }



    /**
     * Purges the array of the events
     */
    protected purgeLog() {
        this._events = [];
    }


}