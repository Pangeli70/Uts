/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230418
 * @version 0.3 APG 20231223
 * @version 0.4 APG 20240728 English comments
 * @version 1.0 APG 20240814 Version + IsDenoDeploy
 * ----------------------------------------------------------------------------
 */

/**
 * Microservice definition. Contains useful data to be displayed in the 
 * html pages or for the logging 
 */
export interface ApgUts_IMicroservice {

    /**
     * Name of the microservice
     */
    name: string;

    /**
     * Version of the microservice
     */
    version: string; // @1.0
    
    /**
     * Description of the microservice
     */
    title: string;

    /**
     * Is Deno Deploy
     */
    isDeploy: boolean; // @1.0
    
    /**
     * IP address of the development server
     */
    devServerIP: string;
    
    /**
     * Port of the development server
     */
    devServerPort: number;
}

