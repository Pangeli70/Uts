/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2023/04/18]
 * @version 0.9.2 [APG 2024/02/25] Refactored
 * @version 0.9.3 [APG 2024/04/02] Removed symbol from signature type
 * @version 0.9.4 [APG 2024/08/14] Introduced template type for payload signature
 * @version 1.0.0 [APG 2024/11/07] Movoing to Deno V2
 * ----------------------------------------------------------------------------
 */



/**
 * Result with error handling and payload to avoid exceptions handling
 */
export class ApgUts_Result<T> {


    /**
     * Status of the result
     */
    ok = true;

    /**
     * Warnings, notifications and Error messages if status is false
     */
    private _messages: string[] = [];
    get messages() { return this._messages; }

    /**
     * Value for the object carried by the result
     */
    private _payload?: T;
    get payload() { return this._payload; }

    /**
     * Signature of the payload's type for quick raw type verification
     */
    private _signature?: string;
    get signature() { return this._signature; }




    /**
     * Adds a payload to the result
     * @param apayload It is expected to be of the type used to create the object in the constructor
     * @param asignature Optional signature of the payload
     */
    setPayload(
        apayload: T,
        asignature?: string
    ) {

        this._payload = apayload;

        if (asignature) {
            this._signature = asignature;
        }

    }



    /**
     * Verifies if the payload has the expected signature
     * @param asignature 
     * @returns true if result has payload, has signature and it matches
     */
    checkSignature(
        asignature: string
    ) {
        let r = false;
        if (
            this._payload !== undefined &&
            this._signature !== undefined &&
            this._signature === asignature
        ) {
            r = true;
        }
        return r;
    }



    /**
     * Changes the state of the result to ok=false
     * @param amethod Where the error is occurred
     * @param amessage Message to be added
     * @param amessages Array of previously generated messages to be concatenated before the current message.
     * @returns itself to chain operations
     */
    error(
        amethod: string,
        amessage: string,
        amessages?: string[]
    ) {
        this.ok = false;

        return this.message(amethod, amessage, amessages)
    }



    /**
     * Add a message to the result can be an error or an information
     * @param amethod Method where the message or error occurred
     * @param amessage Text of the message
     * @param amessages Array of previously generated messages to be concatenated before the current message.
     * This is useful to merge results.
     * @returns itself to chain operations
     */
    message(
        amethod: string,
        amessage: string,
        amessages?: string[]
    ) {

        if (Array.isArray(amessages)) {
            this._messages.push(...amessages);
        }
        this._messages.push(`${amethod}: ${amessage}`);

        return this;

    }



    /**
     * Join all the messages in a single string
     * @param ajoinString String used to join the messages
     */
    joinMessages(
        ajoinString = "/n"
    ) {
        return this._messages.join(ajoinString);
    }

}

