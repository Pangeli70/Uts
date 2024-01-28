/** ---------------------------------------------------------------------------
 * @module [BrdUts]
 * @author [APG] Angeli Paolo Giusto 
 * @version 0.1 APG 20230724
 * @version 0.2 APG 20231227 Estratto dal vecchio 3Dv e aggiunto metodi Begin ed End
 * ----------------------------------------------------------------------------
 */


/**
 * Registratore eventi per il debug
 */
export class BrdUts_Logger {

    private _isDebug: boolean;
    private _module = import.meta.filename;
    private _method = "";
    private _startTime: number = performance.now();
    private _beginTime: number = performance.now();
    private _lastTime: number = performance.now();
    private _events: string[] = [ ];

    constructor (aisDebug: boolean){
        this._isDebug = aisDebug;
        this.log(`Logger started at: ${new Date().toLocaleString()}`)
    }



    begin(
        amodule: string,
        amethod: string,
        amessage?: string
    ) { 
        this._module = amodule;
        this._method = amethod;
        this._beginTime = performance.now();
        this.log(`Begin...${amessage}`);
    }



    log(
        aevent: string
    ){
        const currentTime = performance.now();
        
        const totalDeltaTime = (currentTime - this._startTime)
            .toFixed(0)
            .padStart(4, "0");
        const localDeltaTime = (currentTime - this._lastTime)
            .toFixed(0)
            .padStart(5, "0");
        
        const event = `${localDeltaTime}/${totalDeltaTime}ms - ${this._module}.${this._method}:${aevent}`;
        
        this._events.push(event);
        if(this._isDebug){
            console.log(event);
        }
        this._lastTime = currentTime;
    }



    end(
        amessage?: string
    ) {
        const currentTime = performance.now();

        const totalDeltaTime = (currentTime - this._beginTime)
            .toFixed(0)
            .padStart(4, "0");
        
        this.log(`End (${totalDeltaTime})ms ${amessage}`);

        this._module = import.meta.filename;
        this._method = "";

    }


    
    print(){
        const r : string[] = []
        for (const event of this._events){
            r.push(`${event}`)
        }
        return r.join("\n\r");
    }



    clear() { 
        this._events = [];
        this.log('Logger cleared');
    }
    
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