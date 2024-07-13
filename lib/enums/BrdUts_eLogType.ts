/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240706
 * ----------------------------------------------------------------------------
 */

/**
 * Tipo di evento registrato
 */
export enum BrdUts_eLogType {

    /** Errore */
    ERROR = "Error",

    /** Informazione */
    INFO = "Info ",

    /** Prestazione */
    PERF = "Perf ",

    /** Sviluppo */
    DEBUG = "Debug",

    /** Chiamata */
    CALL = "Call ",

    /** Risposta */
    ANSW = "Answ ",

    /** Autenticazione */
    AUTH = "Auth ",
}