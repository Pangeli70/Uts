/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240728 Extraction to its own class
 * @version 0.2 APG 20240826 Renaming fields
 * @version 0.3 APG 20240921 loggable events
 * @version 0.4 APG 20241102 cleanup and alignment with ApgUts_Class
 * ----------------------------------------------------------------------------
 */

import {
    ApgUts_Result
} from "../classes/ApgUts_Result.ts";
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



/**
 * Base class for all services that usually are long living objects like singletons.
 * It is similar to {@link ApgUts_Class} but has all static properties and methods.
 */
export abstract class ApgUts_Service {

    protected static _built = false;

    protected static _name = "";

    protected static _events: ApgUts_ILoggableEvent[] = [];
    static get Events() { return this._events; }


    protected static Intitializer() {

        if (!this._built) {
            this._name = this.InitServiceName();
            this._events = [];
            this._built = true;
        }

    }



    /** (Virtual abstract method)
     * 
     * This is mandatory to be implemented by the child classes and is used for
     * logging and telemetry and to avoid throwing errors.
     */
    protected static InitServiceName(): string {

        ApgUts.CalledVirtualAbstractSoExit(ApgUts_Service.name, this.InitServiceName.name);
        return "";

    }



    /**
     * Creates a string with the name of the class and the name of the method
     */
    protected static Method(
        // deno-lint-ignore ban-types
        amethod: Function
    ) {
        this.Intitializer();
        return this.name + "." + amethod.name + "(): ";
    }


    /**
     * Logs the error event and stores the error message in the result argument
     * Returns the result argument so we can return using this method
     */
    protected static Error<T>(
        aresult: ApgUts_Result<T>,
        amethod: string,
        amessage: string,
        amessages?: string[]
    ) {
        this.LogError(amethod, amessage)
        return aresult.error(amethod, amessage, amessages);
    }




    /**
     * Logs an event associated to this class
     */
    protected static LogEvent(
        aevent: ApgUts_ILoggableEvent
    ) {
        this.Intitializer();
        this._events.push(aevent);
    }



    /**
     * Creates and logs an event
     */
    protected static Log(
        atype: ApgUts_eEventType,
        amethod: string,
        amessage: string
    ) {

        this.Intitializer();
        const event = ApgUts_EventFactory.New(
            atype, this.name, amethod, amessage
        );
        this._events.push(event);

    }



    /**
     * Creates and logs an info event
     */
    protected static LogInfo(amethod: string, amessage: string) {

        this.Intitializer();
        const event = ApgUts_EventFactory.Info(
            this.name, amethod, amessage
        );
        this._events.push(event);

    }



    /**
     * Creates and logs a performance event at the beginning of the method
     * @returns The method name
     */
    protected static LogBegin(
        // deno-lint-ignore ban-types
        amethod: Function,
        amessage = ""
    ) {

        this.Intitializer();
        const event = ApgUts_EventFactory.New(
            ApgUts_eEventType.PERF, this.name, amethod.name, 'Begin... ' + amessage
        );
        this._events.push(event);

        return event;

    }



    /**
     * Creates and logs a performance event at the end of the method
     */
    protected static LogEnd(
        abeginEvent: ApgUts_ILoggableEvent
    ) {
        this.Intitializer();
        const delta = (performance.now() - abeginEvent.time).toFixed(2);
        const event = ApgUts_EventFactory.New(
            ApgUts_eEventType.PERF, this.name, abeginEvent.method, `... End [${delta}]ms`
        );
        this._events.push(event);

    }



    /**
     * Creates and logs an error event
     */
    protected static LogError(amethod: string, amessage: string) {

        this.Intitializer();
        const event = ApgUts_EventFactory.Error(
            this.name, amethod, amessage
        );
        this._events.push(event);

    }



    /**
     * Creates and logs a debug event
     */
    protected static LogDebug(amethod: string, amessage: string) {

        this.Intitializer();
        const event = ApgUts_EventFactory.Debug(
            this.name, amethod, amessage
        );
        this._events.push(event);

    }



    /**
     * Purges the array of the events
     */
    protected static PurgeLog() {
        this._events = [];
    }




}