/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418
 * @version 0.3 APG 20231223
 * @version 0.4 APG 20240728 English comments
 * ----------------------------------------------------------------------------
 */

/**
 * Microservice definition. Contains useful data to be displayed in the 
 * html pages or for the logging 
 */
export interface ApgUts_IMicroservice {


    name: string;

    
    description: string;
    
    
    devServerIP: string;
    
    
    devServerPort: number;
}

