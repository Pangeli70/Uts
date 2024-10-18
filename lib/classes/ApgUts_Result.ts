/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20230418
 * @version 0.2 APG 20240225 Refactored
 * @version 0.3 APG 20240402 Removed symbol from signature type
 * @version 0.4 APG 20240814 Introduced template type for payload signature
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
     * @param asignature 
     */
    setPayload(
        apayload: T,
        asignature: string
    ) {

        this._payload = apayload;
        this._signature = asignature;

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
     * @returns itself to chain operations
     */
    error(
        amethod: string,
        amessage: string
    ) {
        this.ok = false;
        this._messages.push(`${amethod}: ${amessage}`);
        return this;
    }



    /**
     * Add a message to the result can be an error or an information
     * @param amethod Method where the message or error occurred
     * @param amessage Text of the message
     * @param amessages Array of previously generated messages to be concatenated before the current message.
     * This is useful to merge results.
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

