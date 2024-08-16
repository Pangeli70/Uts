/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20230418
 * @version 0.2 APG 20240225 Refactored
 * @version 0.3 APG 20240402 Removed symbol from signature type
 * ----------------------------------------------------------------------------
 */



/**
 * Result with error handling to avoid exceptions handling
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




    setPayload(
        apayload: T,
        asignature: string
    ) {

        this._payload = apayload;
        this._signature = asignature;

    }



    error(
        amethod: string,
        amessage: string
    ) {
        this.ok = false;
        this._messages.push(`${amethod}: ${amessage}`);
        return this;
    }



    message(
        amethod: string,
        amessage: string
    ) {
        this._messages.push(`${amethod}: ${amessage}`);
    }



    getMessages(
        ajoinString = "/n"
    ) {
        return this._messages.join(ajoinString);
    }

}

