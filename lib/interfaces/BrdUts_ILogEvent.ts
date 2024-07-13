/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * ----------------------------------------------------------------------------
 */

import { BrdUts_eLogType } from "../enums/BrdUts_eLogType.ts";



/**
 * Definizione di un evento da registrare
 */
export interface BrdUts_ILogEvent {

    /** Data e ora di creazione dell'evento */
    created: Date;

    /** Tempo del server al momento della registrazione */
    time: number;

    /** Tipo di evento */
    type: BrdUts_eLogType;

    /** Nome del file da Import.meta.url */
    module: string;

    /** Metodo o funzione */
    function: Function;

    /** Messaggio associato all'evento */
    message: string;
}



