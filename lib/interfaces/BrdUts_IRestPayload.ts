/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20230418
 * @version 0.1 APG 20240402 trasformato in interface
 * ----------------------------------------------------------------------------
 */



/**
 * Payload per il risultato di una chiamata ad un server REST
 */
export interface BrdUts_IRestPayload  {

    /**
     * Firma del record che descrive il tipo di dati inviati o ricevuti
     */
    signature: string;

    /**
     * Può essere qualsiasi tipo per questo per non dover gestire una validazione
     * granulare dei dati ricevuti dalla chiamata al server REST ci affidiamo alla 
     * correttezza della corrispondenza con la firma. Non è solidissimo ma è meglio 
     * di niente per fare una convalida rapida
     */
    data: unknown;
}; 


/*! ---------------------------------------------------------------------------
 * @copyright Breda Sistemi industriali S.p.A., 2023 - http://bredasys.com
 * All rights reserved 
 * @licence You cannot host, display, distribute or share this Work in any 
 * form, both physical and digital. You cannot use this Work in any commercial
 * or non-commercial product, website or project. You cannot sell this Work
 * and you cannot mint an NFTs out of it.
 * --------------------------------------------------------------------------- 
 */