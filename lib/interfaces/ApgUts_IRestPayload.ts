/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2023/04/18]
 * @version 0.9.2 [APG 2024/07/28] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */


/**
 * Payload for the result of a call to a REST microservice
 */
export interface ApgUts_IRestPayload {

    /**
     * Signature for a quick and dirt check of the type of the data carried by the payload
     */
    signature: string;

    /**
     * Result of the REST call.
     */
    data: unknown;
}



