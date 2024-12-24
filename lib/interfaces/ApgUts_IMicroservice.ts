/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/18]
 * @version 0.9.3 [APG 2023/12/23]
 * @version 0.9.4 [APG 2024/07/28] English comments
 * @version 0.9.5 [APG 2024/08/14] Version + IsDenoDeploy
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
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
    version: string; 
    
    /**
     * Description of the microservice
     */
    title: string;

    /**
     * Is Deno Deploy
     */
    isDeploy: boolean; 
    
    /**
     * IP address of the development server
     */
    devServerIP: string;
    
    /**
     * Port of the development server
     */
    devServerPort: number;
}

