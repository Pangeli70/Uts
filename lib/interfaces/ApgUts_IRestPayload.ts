/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20230418
 * @version 0.2 APG 20240728 English comments
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



