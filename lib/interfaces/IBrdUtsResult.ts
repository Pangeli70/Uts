/** ---------------------------------------------------------------------------
 * @module [Brd/Uts]
 * @author APG
 * @version 0.2 APG 20230418
 * ----------------------------------------------------------------------------
 */

import { TBrdSignature } from "../types/BrdUtsTypes.ts";

/**
 * Result with error handling to avoid exceptions handling
 */
export interface IBrdUtsResult {

    /** Status of the result */
    ok: boolean;

    /** Error message if status is false */
    error?: string;

    /** Value fr the object carried by the result */
    payload?: unknown;

    /** Signature of the payload's type for quick raw type verification*/
    signature?: TBrdSignature;

}