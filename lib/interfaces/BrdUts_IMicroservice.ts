/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418
 * @version 0.3 APG 20231223
 * ----------------------------------------------------------------------------
 */

/**
 * Descrittore del microservizio
 */
export interface BrdUts_IMicroservice {
    name: string;
    description: string;
    devServerIP: string;
    devServerPort: number;
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