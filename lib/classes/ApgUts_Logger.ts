/** ---------------------------------------------------------------------------
 * @module [ApgUts]
 * @author [APG] ANGELI Paolo Giusto 
 * @version 0.9.1 [APG 2023/07/24]
 * @version 0.9.2 [APG 2023/12/27] Added Begin and End methods
 * @version 0.9.3 [APG 2024/07/28] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno 2
 * ----------------------------------------------------------------------------
 */


/**
 * Events recorder for debugging and telemetry
 */
export class ApgUts_Logger {


    private _toConsole: boolean;
    
    private _startTime: number = performance.now();

    private _beginTime: number = performance.now();

    private _lastTime: number = performance.now();

    private _events: string[] = [ ];


    
    constructor (atoConsole: boolean){
        this._toConsole = atoConsole;
        this.log(`Logger started at: ${new Date().toLocaleString()}`)
    }



    begin(
        amodule: string,
        amethod: string,
        amessage = ""
    ) { 
        this._beginTime = performance.now();
        this.log(`Begin...${amessage}`, amodule, amethod);
    }



    log(
        aevent: string,
        amodule?: string,
        amethod?: string
    ){
        const currentTime = performance.now();
        
        const totalDeltaTime = (currentTime - this._startTime)
            .toFixed(0)
            .padStart(4, "0");
        const localDeltaTime = (currentTime - this._lastTime)
            .toFixed(0)
            .padStart(5, "0");
        
        const module = (amodule) ? amodule : "";
        const method = (amethod) ? "." + amethod : "";
         
        const event = `${localDeltaTime}/${totalDeltaTime}ms [${module}${method}]:${aevent}`;
        
        this._events.push(event);

        if(this._toConsole){
            console.log(event);
        }

        this._lastTime = currentTime;
    }



    end(
        amessage = ""
    ) {
        const currentTime = performance.now();

        const totalDeltaTime = (currentTime - this._beginTime)
            .toFixed(0)
            .padStart(4, "0");
        
        this.log(`${amessage} ...end (${totalDeltaTime})ms`);

    }


    
    print(){
        const r : string[] = []
        for (const event of this._events){
            r.push(`${event}`)
        }
        return r.join("\n");
    }



    clear() { 
        this._events = [];
        this.log('Logger cleared');
    }
    
}
