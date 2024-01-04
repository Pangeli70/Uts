/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20231206 
 * @version 0.2 APG 20240103 Spostato da 3Dv a Uts
 * ----------------------------------------------------------------------------
 */

/**
 * Risultato della chiamata ad un servizio REST Breda
 */
export interface BrdUts_IRestResult {
    
    /**
     * Stato della risultato della chiamata al microservizio
     */
    ok: boolean;

    /**
     * Messaggio associato alla risposta. Può essere un messaggio di errore o un
     * messaggio informativo
     */
    message: string;

    /**
     * Eventuale risultato della elaborazione 
     */
    payload?: unknown;

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

