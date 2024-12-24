/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/07/06]
 * @version 0.9.2 [APG 2024/07/28] English comments
 * @version 0.9.3 [APG 2024/08/26] Renamed from log type to event type
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */

/**
 * Type of event occurred when a microservice is running
 */
export enum ApgUts_eEventType {

    /** Error */
    ERROR = "Error",

    /** information */
    INFO = "Info ",

    /** Performance measure */
    PERF = "Perf ",

    /** Only for development */
    DEBUG = "Debug",

    /** Call: request received */
    CALL = "Call ",

    /** Answer: response ready */
    ANSW = "Answ ",

    /** Authentication */
    AUTH = "Auth ",

    /** Redirection */
    REDIR = "Redir ",

    /** Telemetry */
    TELE = "Tele "
}