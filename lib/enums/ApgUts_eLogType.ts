/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240706
 * @version 0.2 APG 20240728 English comments
 * ----------------------------------------------------------------------------
 */

/**
 * Type of event
 */
export enum ApgUts_eLogType {

    /** Error */
    ERROR = "Error",

    /** information */
    INFO = "Info ",

    /** Performance measure */
    PERF = "Perf ",

    /** Debug */
    DEBUG = "Debug",

    /** Call: request received */
    CALL = "Call ",

    /** Answer: response ready */
    ANSW = "Answ ",

    /** Authentication */
    AUTH = "Auth ",
}