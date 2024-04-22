/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20231206 
 * @version 0.2 APG 20240103 Spostato da 3Dv a Uts
 * ----------------------------------------------------------------------------
 */

import {
    BrdUts_IRestPayload
} from "../interfaces/BrdUts_IRestPayload.ts";




/**
 * Risultato della chiamata ad un servizio REST Breda
 */
export class BrdUts_RestResult {

    /**
     * Nome del microservizio che ha inviato la risposta
     */
    service: string;

    /**
     * Metodo della richiesta
     */
    method?: string;

    /**
     * Url della richiesta 
     */
    url?: string;

    /**
     * Stato della risultato della richiesta al microservizio
     */
    ok = true;

    /**
     * Messaggio associato alla risposta. Può essere un messaggio di errore o un
     * messaggio informativo.
     */
    message: string | string[] = "";

    /**
     * Eventuale risultato della elaborazione 
     */
    payload?: BrdUts_IRestPayload;

    /**
     * Data ora del ricevimento della richiesta 
     */
    dateTime: string;

    /**
     * Tempo totale della elaborazione in millisecondi
     */
    totalTime: number;



    constructor(aserviceName: string) {
        this.service = aserviceName;
        this.dateTime = (new Date()).toISOString();
        this.totalTime = performance.now()
    }

    updateTotalTime() { 
        this.totalTime = performance.now() - this.totalTime;
    }

    fail(amessage: string) { 
        this.ok = false;
        this.message = amessage;
        this.updateTotalTime();
    }

}



/*! ---------------------------------------------------------------------------
 * @copyright Breda Sistemi industriali S.p.A., 2023 - http://bredasys.com
 * All rights reserved
 * @licence You cannot host, display, distribute or share this Work in any
 * form, both physical and digital. You cannot use this Work in any commercial
 * or non-commercial product, website or project. You cannot sell this Work
 * and you cannot mint an NFTs out of it.
 * ---------------------------------------------------------------------------
 */

