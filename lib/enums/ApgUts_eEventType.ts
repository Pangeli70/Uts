/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240706
 * @version 0.2 APG 20240728 English comments
 * @version 0.3 APG 20240826 Renamed from log type to event type
 * ----------------------------------------------------------------------------
 */

/**
 * Type of event
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